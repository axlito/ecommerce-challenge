import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from "@components/breadcrumb/breadcrumb";
import { RatingStars } from "@components/rating-stars/rating-stars";
import { BreadcrumbInterface } from '@interfaces/breadcrumb';
import { AppStore } from '@store/app-store';
import { ProductCard } from "@components/product-card/product-card";

@Component({
    selector: 'app-product-details',
    imports: [Breadcrumb, RatingStars, CurrencyPipe, ProductCard],
    templateUrl: './product-details.html',
    styleUrl: './product-details.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetails implements OnInit {
    appStore = inject(AppStore);
    #activatedRoute = inject(ActivatedRoute);
    routes: BreadcrumbInterface[] = [
        { route: "", name: "Home" },
        { route: "/products", name: "Product Details", current: true },
    ];

    ngOnInit(): void {
        this.#activatedRoute.params.subscribe((params) => {
            const id = Number(params['id']);
            this.routes[1].route = `/products/${id}`;
            this.appStore.setSelectedProduct(id);
        });
    }

    public addProductToCart(id: number): void {
        this.appStore.addProductToCart(id);
    }

}
