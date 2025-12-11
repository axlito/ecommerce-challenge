import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '@interfaces/auth';
import { AppStore } from 'src/app/store/app-store';
import { AuthStore } from 'src/app/store/auth-store';
import { Observable, switchMap } from 'rxjs';
import { User } from '@interfaces/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly store = inject(AuthStore);
  #auth = inject(AuthService);
  #location = inject(Location);

  public login_form = new FormGroup({
    username: new FormControl<string>('johnd', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('m38rmF$', { nonNullable: true, validators: [Validators.required] }),
  });

  public loginUser(): void {
    let user_token: string;

    if (this.login_form.invalid) {
      console.log('You must fill out all fields!');
      return;
    }
    this.#auth.loginUser(this.login_form.value as Auth).pipe(
      switchMap((token: string) => {
        if (token) {
          // console.log(token);
          user_token = token;
          return this.#auth.getUserByCredentials(this.login_form.value as Auth);
        }
        return new Observable<undefined>;
      })).subscribe((user: User | undefined) => {
        if (user !== undefined) {
          // console.log(user);
          this.store.authenticateUser(user_token, user);
          this.#location.back();
        }
      });

  }

}
