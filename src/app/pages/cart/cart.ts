import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Breadcrumb } from "@components/breadcrumb/breadcrumb";
import { CartItem } from "@components/cart-item/cart-item";
import { Breadcrumbs } from '@interfaces/breadcrumb';
import { AppStore } from 'src/app/store/app-store';

@Component({
    selector: 'app-cart',
    imports: [Breadcrumb, RouterLink, CartItem],
    templateUrl: './cart.html',
    styleUrl: './cart.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart {
    #appStore = inject(AppStore);
    readonly user_cart = this.#appStore.user_cart;
    readonly product_list = this.#appStore.product_list;
    readonly is_user_auth = this.#appStore.userIsAuthenticated;
    readonly routes: Breadcrumbs[] = [
        { route: "", name: "Home" },
        { route: "/cart", name: "Your Cart", current: true },
    ];

}
