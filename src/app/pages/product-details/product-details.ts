import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Breadcrumb } from "@components/breadcrumb/breadcrumb";
import { ProductCard } from "@components/product-card/product-card";
import { RatingStars } from "@components/rating-stars/rating-stars";
import { BreadcrumbInterface } from '@interfaces/breadcrumb';
import { AppStore } from '@store/app-store';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-product-details',
    imports: [Breadcrumb, RatingStars, CurrencyPipe, ProductCard, RouterLink],
    templateUrl: './product-details.html',
    styleUrl: './product-details.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetails {
    appStore = inject(AppStore);
    readonly id = input.required<number>();
    routes: BreadcrumbInterface[] = [
        { route: "", name: "Home" },
        { route: "/products", name: "Product Details", current: true },
    ];

    constructor() {
        this.appStore.getSelectedProduct(this.id);
    }

    public addProductToCart(id: number): void {
        this.appStore.addProductToCart(id);
    }

}
