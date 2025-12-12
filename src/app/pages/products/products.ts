import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { shortDescriptionPipe } from "@pipes/short-description";
import { AppStore } from '@store/app-store';

@Component({
    selector: 'app-products',
    imports: [shortDescriptionPipe, CurrencyPipe],
    templateUrl: './products.html',
    styleUrl: './products.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Products implements OnInit {
    #appStore = inject(AppStore);
    protected product_list = this.#appStore.product_list;

    ngOnInit(): void {
        this.#appStore.getAllProducts();
    }

    public getRatingData(rating: number): number[] {
        let aux: number[] = [-1, -1, -1, -1, -1];
        if (rating % 1 === 0) {
            for (let i = 0; i < rating; i++) {
                aux[i] = 1;
            }
        } else {
            for (let i = 0; i < Math.floor(rating); i++) {
                aux[i] = 1;
            }
            aux[Math.floor(rating)] = 0;
        }
        return aux;
    }

}
