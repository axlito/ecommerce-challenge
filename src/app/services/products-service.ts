import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Cart } from '@interfaces/cart';
import { Product } from '@interfaces/product';
import { User } from '@interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API_URL = environment.API_URL;
  #httpClient = inject(HttpClient);

  public getProductsData(): Observable<Product[]> {
    return this.#httpClient.get<Product[]>(`${this.API_URL}/products`);
  }

  public getCartsData(): Observable<Cart[]> {
    return this.#httpClient.get<Cart[]>(`${this.API_URL}/carts`);
  }

  public getUsersData(): Observable<User[]> {
    return this.#httpClient.get<User[]>(`${this.API_URL}/users?limit=50`);
  }

}
