import { computed, inject } from '@angular/core';
import { Product } from '@interfaces/product';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ProductsService } from '@services/products-service';

type AppState = {
    products: Product[];
    cart: Product[];
    selectedProduct: Product | undefined;
    isLoading: boolean;
};

const initialState: AppState = {
    products: [],
    cart: [],
    selectedProduct: undefined,
    isLoading: false,
};

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        getCartSize: computed(() => {
            const cart = state.cart();
            return cart.length;
        })
    })),
    withMethods((store, productsService = inject(ProductsService)) => ({
        getProductsList(): void {
            patchState(store, {
                products: [],
                isLoading: true
            });
            productsService.getProductsData().subscribe((result: Product[]) => {
                patchState(store, {
                    products: result,
                    isLoading: false
                });
            });
        },
        getProductDetails(selected_product: Product): void {
            patchState(store, {
                selectedProduct: selected_product
            });
        },
        addProductToCart(selected_product: Product): void {
            let newCart: Product[] = store.cart();
            newCart.push(selected_product);
            patchState(store, {
                cart: newCart
            });
            // console.log(store.cart());
        },
        removeProductFromCart(selected_product: Product): void {
            let newCart: Product[] = store.cart();
            newCart = newCart.filter((p) => p !== selected_product);
            patchState(store, {
                cart: newCart
            });
            // console.log(store.cart());
        }
    }))

);