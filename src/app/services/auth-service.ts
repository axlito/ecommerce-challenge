import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Auth } from '@interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.API_URL;
  #httpClient = inject(HttpClient);

  public loginUser(data: Auth): Observable<string> {
    return this.#httpClient.post<string>(`${this.API_URL}/auth/login`, data);
  }

}
