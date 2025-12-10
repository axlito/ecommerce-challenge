import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../types/product';
import { inject, Signal } from '@angular/core';
import { ProductsService } from '@services/products-service';

type ProductsState = {
    products: Product[];
    selectedProduct: Product | undefined;
    isLoading: boolean;
};

const initialState: ProductsState = {
    products: [],
    selectedProduct: undefined,
    isLoading: false,
};

export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

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
        getProductDetails(selected: Product): void {
            patchState(store, {
                selectedProduct: selected
            });
        }
    }))

);