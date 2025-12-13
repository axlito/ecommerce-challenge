import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthInterface } from '@interfaces/auth';
import { UserInterface } from '@interfaces/user';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly API_URL = environment.API_URL;
    #httpClient = inject(HttpClient);

    public loginUser(data: AuthInterface): Observable<string> {
        return this.#httpClient.post<string>(`${this.API_URL}/auth/login`, data);
    }

    public getUserByCredentials(credentials: AuthInterface): Observable<UserInterface | undefined> {
        return this.#httpClient.get<UserInterface[]>(`${this.API_URL}/users`).pipe(
            map((users: UserInterface[]) => { return users.find((u: UserInterface) => (u.username === credentials.username && u.password === credentials.password)); })
        );
    }

}
