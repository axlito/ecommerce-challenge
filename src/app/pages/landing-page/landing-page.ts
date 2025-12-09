import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductsList } from '@services/products-list';
import { Product } from 'src/app/types/product';
import { shortDescriptionPipe } from "@pipes/short-description";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [shortDescriptionPipe, CurrencyPipe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage implements OnInit {
  protected products_data = signal<Product[] | null>(null);
  #products = inject(ProductsList);

  ngOnInit(): void {
    this.getProductsData();
  }

  public getProductsData(): void {
    this.#products.getProductsData()
      .subscribe((result: Product[]) => {
        this.products_data.set(result);
        // console.log(result);
      });
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
