import { computed, inject } from '@angular/core';
import { Cart } from '@interfaces/cart';
import { Product } from '@interfaces/product';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { ProductsService } from '@services/products-service';
import { User } from '@interfaces/user';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, pipe, switchMap, tap } from 'rxjs';

type AppState = {
    product_list: Map<number, Product>;
    user_cart: Cart;
    auth_user: User | null;
    user_token: string;
    is_loading: boolean;
};

const initialState: AppState = {
    product_list: new Map(),
    user_cart: {
        products: [],
    },
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
        getCartSize: computed(() => {
            let cart_size = 0;
            state.user_cart()?.products.forEach((p) => {
                cart_size += p.quantity;
            });
            return cart_size;
        }),
    })),
    withMethods((store, productsService = inject(ProductsService)) => ({
        // Products
        getProductsList: rxMethod<void>(pipe(
            tap(() => patchState(store, { is_loading: true })),
            switchMap(() => {
                return productsService.getProductsList().pipe(
                    tap({
                        next: (data: Product[]) => patchState(store, { product_list: new Map(data.map(p => [p.id, p])) }),
                        error: (message => console.error(message)),
                        finalize: (() => patchState(store, { is_loading: false }))
                    })
                );
            }),
        )),
        // Cart
        getUserCart: rxMethod<void>(pipe(
            tap(() => patchState(store, { is_loading: true })),
            switchMap(() => {
                return productsService.getUserCart(store.auth_user()!.id).pipe(
                    tap({
                        next: (data: Cart) => {
                            if (data) {
                                patchState(store, { user_cart: data });
                            } else {
                                const new_cart: Cart = { products: [] };
                                patchState(store, { user_cart: new_cart });
                            }
                        },
                        error: (message => console.error(message)),
                        finalize: (() => patchState(store, { is_loading: false }))
                    })
                );
            }),
        )),
        // Auth
        authenticateUser(token: string, user: User): void {
            patchState(store, { user_token: token, auth_user: user });
            this.getUserCart();
        },
        deauthenticateUser(): void {
            patchState(store, { user_token: "", auth_user: null });
        }
    })),
    withHooks({
        onInit(store) {
            if (store.getProductsCount() === 0) store.getProductsList();
        },
        onDestroy(store) {
            // console.log('on destroy');
            // console.log(store.is_loading());
        },
    }),

);