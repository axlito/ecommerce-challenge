import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from 'src/app/store/auth-store';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css',
  imports: [RouterLink],
})
export class User {
  #router = inject(Router);
  readonly authStore = inject(AuthStore);
  readonly user_data = this.authStore.user;

  public logoutUser(): void {
    this.authStore.deauthenticateUser();
    this.#router.navigate(['']);
  }

}
