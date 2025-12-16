import { computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@enums/category';
import { CartInterface } from '@interfaces/cart';
import { ProductInterface } from '@interfaces/product';
import { UserInterface } from '@interfaces/user';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthService } from '@services/auth-service';
import { ProductsService } from '@services/products-service';
import { debounceTime, of, pipe, switchMap, tap } from 'rxjs';

type AppState = {
    product_list: Map<number, ProductInterface>;
    // cart is a map of <productId, quantity>
    user_cart: Map<number, number>;
    selected_product: ProductInterface | null;
    related_product_list: Map<number, ProductInterface>;
    auth_user: UserInterface | null;
    user_token: string;
    is_loading: boolean;
};

const initialState: AppState = {
    product_list: new Map(),
    user_cart: new Map(),
    selected_product: null,
    related_product_list: new Map(),
    auth_user: null,
    user_token: "",
    is_loading: false,
};

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        userIsAuthenticated: computed(() => {
            return state.auth_user() !== null;
        }),
        getProductsCount: computed(() => {
            return state.product_list().entries.length;
        }),
        getTotalPricing: computed(() => {
            let total = 0;
            state.user_cart().forEach((value, key) => {
                total += (state.product_list().get(key)?.price! * value);
            });
            return total;
        }),
        getCartSize: computed(() => {
            let cart_size = 0;
            state.user_cart().forEach((value) => {
                cart_size += value;
            });
            return cart_size;
        }),
    })),
    withMethods((store, productsService = inject(ProductsService), router = inject(Router)) => ({
        // Products
        getProductsList: rxMethod<void>(pipe(
            tap(() => patchState(store, { is_loading: true })),
            switchMap(() => {
                return productsService.getProductsList().pipe(
                    tap({
                        next: (data: ProductInterface[]) => patchState(store, { product_list: new Map(data.map(p => [p.id, p])) }),
                        // error: (message => console.error(message)),
                        finalize: (() => patchState(store, { is_loading: false }))
                    })
                );
            }),
        )),
        getSelectedProduct: rxMethod<number>(pipe(
            tap(() => patchState(store, { selected_product: null })),
            switchMap((id: number) => {
                return productsService.getProductById(id).pipe(
                    tap({
                        next: (data: ProductInterface) => {
                            patchState(store, { selected_product: data });
                        },
                    }),
                    switchMap(() => {
                        return productsService.getProductByCategory(store.selected_product()?.category as Category).pipe(
                            tap({
                                next: (data: ProductInterface[]) => {
                                    if (data.length === 0) router.navigate(['/error']);
                                    let aux = data.filter(p => p.id !== store.selected_product()?.id).slice(0, 3);
                                    patchState(store, { related_product_list: new Map(aux.map(p => [p.id, p])) });
                                },
                            })
                        );
                    }),

                );
            }),
        )),
        // Cart
        getUserCart: rxMethod<void>(pipe(
            switchMap(() => {
                return productsService.getUserCart(store.auth_user()!.id).pipe(
                    tap({
                        next: (data: CartInterface) => {
                            if (data) {
                                patchState(store, { user_cart: new Map(data.products.map(p => [p.productId, p.quantity])) });
                            }
                        },
                    })
                );
            }),
        )),
        addProductToCart(product_id: number): void {
            let quantity = 1;
            if (store.user_cart().has(product_id)) {
                quantity = store.user_cart().get(product_id)! + 1;
            }
            const new_cart = store.user_cart();
            new_cart.set(product_id, quantity);
            patchState(store, { user_cart: new Map(new_cart) });
            // console.log(store.user_cart().entries());
        },
        removeProductFromCart(product_id: number): void {
            let quantity = 0;
            if (store.user_cart().has(product_id)) {
                quantity = store.user_cart().get(product_id)! - 1;
            }
            const new_cart = store.user_cart();
            if (quantity <= 0) {
                new_cart.delete(product_id);
            } else {
                new_cart.set(product_id, quantity);
            }
            patchState(store, { user_cart: new Map(new_cart) });
            // console.log(store.user_cart().entries());
        },
        resetCart(): void {
            patchState(store, { user_cart: new Map() });
        },
        // Auth
        authenticateUser(token: string, user: UserInterface): void {
            patchState(store, { user_token: token, auth_user: user });
            sessionStorage.setItem('auth_user', JSON.stringify(user));
            sessionStorage.setItem('auth_token', token);
            this.getUserCart();
        },
        deauthenticateUser(): void {
            patchState(store, { user_token: "", auth_user: null, user_cart: new Map() });
            sessionStorage.clear();
        }
    })),
    withHooks({
        onInit(store, authService = inject(AuthService), appService = inject(ProductsService)) {
            const cartChangeEffect = rxMethod<void>(
                pipe(
                    debounceTime(5000),
                    tap((state) => {
                        if (store.userIsAuthenticated()) {
                            console.log('Cart has changed! - executing automatic update');
                            let newCart = {
                                userId: store.auth_user()!.id,
                                products: [
                                    { productId: 0, quantity: 0 }
                                ],
                            };
                            store.user_cart().forEach((value, key) => {
                                newCart.products.push({ productId: key, quantity: value });
                            });
                            newCart.products = newCart.products.slice(1, newCart.products.length);
                            appService.saveUserCart([newCart], store.auth_user()!.id).subscribe(
                                ({ id }) => {
                                    console.log(`Cart updated!`);
                                }
                            );
                        }
                    })
                )
            );
            cartChangeEffect(store.user_cart);

            // const autoLogin = rxMethod<void>(pipe(
            //     switchMap(() => {
            //         if (!sessionStorage.getItem('auth_user') || store.userIsAuthenticated()) return of(undefined);
            //         console.log('User data found - Auth');
            //         const user: UserInterface = JSON.parse(sessionStorage.getItem('auth_user')!);
            //         const username = user!.username;
            //         const password = user!.password;
            //         return authService.loginUser({ username, password }).pipe(
            //             tap({
            //                 next: ({ token }) => {
            //                     if (token) store.authenticateUser(token, user);
            //                 },
            //             })
            //         );
            //     }),
            // ));
            // autoLogin();

            effect(() => {
                if (store.getProductsCount() === 0) {
                    store.getProductsList();
                }
            });
        },
        onDestroy(store) {
            // console.log('on destroy');
        },
    }),

);