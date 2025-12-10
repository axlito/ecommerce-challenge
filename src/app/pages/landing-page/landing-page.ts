import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { shortDescriptionPipe } from "@pipes/short-description";
import { CurrencyPipe } from '@angular/common';
import { ProductsStore } from 'src/app/store/products-store';

@Component({
  selector: 'app-landing-page',
  imports: [shortDescriptionPipe, CurrencyPipe],
  providers: [ProductsStore],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage implements OnInit {
  store = inject(ProductsStore);
  protected products_data = this.store.products;

  ngOnInit(): void {
    this.store.getProductsList();
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
