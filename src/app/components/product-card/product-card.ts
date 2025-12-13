import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RatingStars } from "@components/rating-stars/rating-stars";
import { ProductInterface } from '@interfaces/product';
import { ShortDescriptionPipe } from '@pipes/short-description';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'product-card',
    imports: [CurrencyPipe, ShortDescriptionPipe, RatingStars, RouterLink],
    templateUrl: './product-card.html',
    styleUrl: './product-card.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {
    readonly product = input.required<ProductInterface>();
}
