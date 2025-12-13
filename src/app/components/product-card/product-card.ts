import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RatingStars } from "@components/rating-stars/rating-stars";
import { Product } from '@interfaces/product';
import { ShortDescriptionPipe } from '@pipes/short-description';

@Component({
    selector: 'product-card',
    imports: [CurrencyPipe, ShortDescriptionPipe, RatingStars],
    templateUrl: './product-card.html',
    styleUrl: './product-card.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {
    readonly product = input.required<Product>();
}
