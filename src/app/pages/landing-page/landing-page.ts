import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductsList } from '@services/products-list';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-landing-page',
  imports: [],
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

}
