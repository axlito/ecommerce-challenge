import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CartInterface } from '@interfaces/cart';
import { ProductInterface } from '@interfaces/product';
import { UserInterface } from '@interfaces/user';
import { map, Observable } from 'rxjs';
import { Category } from '@enums/category';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private readonly API_URL = environment.API_URL;
    #httpClient = inject(HttpClient);

    public getProductsList(limit = 20): Observable<ProductInterface[]> {
        return this.#httpClient.get<ProductInterface[]>(`${this.API_URL}/products?limit=${limit}`);
    }

    public getProductById(id: number): Observable<ProductInterface> {
        return this.#httpClient.get<ProductInterface>(`${this.API_URL}/products/${id}`);
    }

    public getProductCategories(): Observable<Category[]> {
        return this.#httpClient.get<Category[]>(`${this.API_URL}/products/categories`);
    }

    public getProductByCategory(category: Category): Observable<ProductInterface[]> {
        return this.#httpClient.get<ProductInterface[]>(`${this.API_URL}//products/category/${category}`);
    }


    public getUserCart(user_id: number): Observable<CartInterface> {
        return this.#httpClient.get<CartInterface[]>(`${this.API_URL}/carts/user/${user_id}`).pipe(
            map((carts: CartInterface[]) => { return carts[0]; })
        );
    }

}
