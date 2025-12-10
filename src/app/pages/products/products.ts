import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { shortDescriptionPipe } from "@pipes/short-description";
import { CurrencyPipe } from '@angular/common';
import { AppStore } from 'src/app/store/app-store';
import { ProductsService } from '@services/products-service';

@Component({
  selector: 'app-products',
  imports: [shortDescriptionPipe, CurrencyPipe],
  providers: [AppStore],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Products implements OnInit {
  readonly store = inject(AppStore);
  protected products_data = this.store.products;

  service = inject(ProductsService);

  ngOnInit(): void {
    this.store.getProductsList();
    this.service.getUsersData().subscribe((result) => {
      console.log(result);
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
