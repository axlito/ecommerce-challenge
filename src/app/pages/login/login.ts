import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInterface } from '@interfaces/auth';
import { TokenInterface } from '@interfaces/token';
import { UserInterface } from '@interfaces/user';
import { AuthService } from '@services/auth-service';
import { switchMap } from 'rxjs';
import { AppStore } from 'src/app/store/app-store';


@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
    appStore = inject(AppStore);
    #authService = inject(AuthService);
    #location = inject(Location);

    public login_form = new FormGroup({
        username: new FormControl<string>('johnd', { nonNullable: true, validators: [Validators.required] }),
        password: new FormControl<string>('m38rmF$', { nonNullable: true, validators: [Validators.required] }),
    });

    public loginUser(): void {
        let user_token: string;
        if (this.login_form.invalid) {
            console.error('You must fill out all fields!');
            return;
        }
        this.#authService.loginUser(this.login_form.value as AuthInterface).pipe(
            switchMap((token: TokenInterface) => {
                user_token = token.token;
                return this.#authService.getUserByCredentials(this.login_form.value as AuthInterface);
            })).subscribe((user: UserInterface | undefined) => {
                if (user !== undefined) {
                    this.appStore.authenticateUser(user_token, user);
                    this.#location.back();
                }
            });
    }

}
