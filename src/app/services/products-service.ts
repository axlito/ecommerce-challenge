import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Cart } from '@interfaces/cart';
import { Product } from '@interfaces/product';
import { User } from '@interfaces/user';
import { map, Observable } from 'rxjs';
import { Category } from '@enums/category';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private readonly API_URL = environment.API_URL;
    #httpClient = inject(HttpClient);

    public getProductsList(limit = 20): Observable<Product[]> {
        return this.#httpClient.get<Product[]>(`${this.API_URL}/products?limit=${limit}`);
    }

    public getProductById(id: number): Observable<Product> {
        return this.#httpClient.get<Product>(`${this.API_URL}/products/${id}`);
    }

    public getProductCategories(): Observable<Category[]> {
        return this.#httpClient.get<Category[]>(`${this.API_URL}/products/categories`);
    }

    public getProductByCategory(category: Category): Observable<Product[]> {
        return this.#httpClient.get<Product[]>(`${this.API_URL}//products/category/${category}`);
    }


    public getUserCart(user_id: number): Observable<Cart> {
        return this.#httpClient.get<Cart[]>(`${this.API_URL}/carts/user/${user_id}`).pipe(
            map((carts: Cart[]) => { return carts[0]; })
        );
    }

}
