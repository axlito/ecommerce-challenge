import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from '@store/app-store';
import { RouterLink } from "@angular/router";
import { DebugStoreDirective } from "src/app/directives/debug-store";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ProductsService } from '@services/products-service';
import { ProductInterface } from '@interfaces/product';

@Component({
    selector: 'navigation-bar',
    imports: [RouterLink, DebugStoreDirective, ReactiveFormsModule],
    templateUrl: './navigation-bar.html',
    styleUrl: './navigation-bar.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBar {
    appStore = inject(AppStore);
    #appService = inject(ProductsService);

    public search_form = new FormGroup({
        search: new FormControl<string>('', [Validators.required]),
    });

    public searchProduct(): void {
        if (this.search_form.invalid) {
            this.search_form.reset();
            return;
        }
        this.#appService.getProductsByQuery(this.search_form.controls.search.value as string).subscribe(
            (data: ProductInterface[]) => {
                console.log(data);
                this.search_form.reset();
            }
        );
    }

}
