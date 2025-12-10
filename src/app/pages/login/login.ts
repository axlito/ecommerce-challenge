import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '@interfaces/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  #auth = inject(AuthService);

  public login_form = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  public loginUser(): void {
    if (this.login_form.invalid) {
      console.log('You must fill out all fields!');
      return;
    }
    this.#auth.loginUser(this.login_form.value as Auth).subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });

  }

}
