import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Breadcrumb } from "@components/breadcrumb/breadcrumb";
import { AppStore } from 'src/app/store/app-store';

@Component({
  selector: 'app-cart',
  imports: [Breadcrumb, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart {
  #appStore = inject(AppStore);
  readonly user_cart = this.#appStore.user_cart;
  readonly product_list = this.#appStore.product_list;
  readonly user_has_cart = this.#appStore.userHasCart;
  readonly is_user_auth = this.#appStore.userIsAuthenticated;

}
