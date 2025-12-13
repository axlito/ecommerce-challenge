import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCard } from "@components/product-card/product-card";
import { AppStore } from '@store/app-store';
import { SkeletonLoading } from "@components/skeleton-loading/skeleton-loading";

@Component({
    selector: 'app-products',
    imports: [ProductCard, SkeletonLoading],
    templateUrl: './products.html',
    styleUrl: './products.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Products {
    #appStore = inject(AppStore);
    protected product_list = this.#appStore.product_list;
    protected is_loading = this.#appStore.is_loading;
}
