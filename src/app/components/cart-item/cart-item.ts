import { Component, inject, input } from '@angular/core';
import { ProductInterface } from '@interfaces/product';
import { RatingStars } from "@components/rating-stars/rating-stars";
import { CurrencyPipe } from '@angular/common';
import { ShortDescriptionPipe } from '@pipes/short-description';
import { AppStore } from '@store/app-store';

@Component({
    selector: 'cart-item',
    imports: [RatingStars, CurrencyPipe],
    templateUrl: './cart-item.html',
    styleUrl: './cart-item.css',
})
export class CartItem {
    appStore = inject(AppStore);
    readonly products = input.required<{ product: ProductInterface | undefined, quantity: number; }>();

    public addProductToCart(id: number): void {
        this.appStore.addProductToCart(id);
    }

    public removeProductFromCart(id: number): void {
        this.appStore.removeProductFromCart(id);
    }

}
