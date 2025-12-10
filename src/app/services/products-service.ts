import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API_URL = environment.API_URL;
  #httpClient = inject(HttpClient);

  public getProductsData(): Observable<Product[]> {
    return this.#httpClient.get<Product[]>(`${this.API_URL}/products`);
  }
}
