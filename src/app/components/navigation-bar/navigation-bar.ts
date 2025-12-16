import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Field, form, required, submit } from '@angular/forms/signals';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { ProductInterface } from '@interfaces/product';
import { ProductsService } from '@services/products-service';
import { AppStore } from '@store/app-store';
import { DebugStoreDirective } from "src/app/directives/debug-store";

interface SearchFormInterface {
    search: string;
}

@Component({
    selector: 'navigation-bar',
    imports: [RouterLink, DebugStoreDirective, Field],
    templateUrl: './navigation-bar.html',
    styleUrl: './navigation-bar.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBar {
    appStore = inject(AppStore);
    #appService = inject(ProductsService);
    #router = inject(Router);
    protected showHeader = signal<boolean>(true);

    constructor() {
        this.#router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && val.url === '/login') {
                this.showHeader.set(false);
            } else {
                this.showHeader.set(true);
            }
        });
    }

    search_model = signal<SearchFormInterface>({
        search: ''
    });

    search_form = form(this.search_model, (path) => {
        required(path.search);
    });

    onSubmit(event: Event) {
        event.preventDefault();
        submit(this.search_form, async () => {
            this.#appService.getProductsByQuery(this.search_form().value().search).subscribe(
                (data: ProductInterface[]) => {
                    console.log(data);
                    this.search_form().reset();
                }
            );
        });
    }

}
