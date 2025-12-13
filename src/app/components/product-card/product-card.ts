import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RatingStars } from "@components/rating-stars/rating-stars";
import { ProductInterface } from '@interfaces/product';
import { ShortDescriptionPipe } from '@pipes/short-description';
import { RouterLink } from "@angular/router";
import { AppStore } from '@store/app-store';

@Component({
    selector: 'product-card',
    imports: [CurrencyPipe, ShortDescriptionPipe, RatingStars, RouterLink],
    templateUrl: './product-card.html',
    styleUrl: './product-card.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {
    appStore = inject(AppStore);
    readonly product = input.required<ProductInterface>();

    public addProductToCart(id: number): void {
        this.appStore.addProductToCart(id);
    }

}
