import { Component, input } from '@angular/core';
import { Product } from '@interfaces/product';
import { RatingStars } from "@components/rating-stars/rating-stars";
import { CurrencyPipe } from '@angular/common';
import { ShortDescriptionPipe } from '@pipes/short-description';

@Component({
    selector: 'cart-item',
    imports: [RatingStars, CurrencyPipe],
    templateUrl: './cart-item.html',
    styleUrl: './cart-item.css',
})
export class CartItem {
    readonly products = input.required<{ product: Product | undefined, quantity: number; }>();
}
