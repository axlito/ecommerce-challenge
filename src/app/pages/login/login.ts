import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Field, form, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthInterface } from '@interfaces/auth';
import { TokenInterface } from '@interfaces/token';
import { UserInterface } from '@interfaces/user';
import { AuthService } from '@services/auth-service';
import { NotificationsStore } from '@store/notification-store';
import { debounceTime, switchMap } from 'rxjs';
import { AppStore } from 'src/app/store/app-store';

interface LoginFormData {
    username: string,
    password: string,
}

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, Field],
    templateUrl: './login.html',
    styleUrl: './login.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
    appStore = inject(AppStore);
    notificationStore = inject(NotificationsStore);
    #authService = inject(AuthService);
    #router = inject(Router);
    protected is_loading = signal<boolean>(false);

    login_model = signal<LoginFormData>({
        username: 'johnd',
        password: 'm38rmF$',
    });

    login_form = form(this.login_model, (path) => {
        required(path.username, { message: 'Username is required' });
        required(path.password, { message: 'Password is required' });
    });

    public isFieldInvalid(name: keyof LoginFormData) {
        const field = this.login_form[name];
        if (!field) return;
        return field() && field().touched() && field().errors().length > 0;
    }

    onSubmit(event: Event) {
        event.preventDefault();
        submit(this.login_form, async () => {
            let user_token = '';
            this.is_loading.set(true);
            this.#authService.loginUser(this.login_form().value() as AuthInterface).pipe(
                switchMap((token: TokenInterface) => {
                    user_token = token.token;
                    return this.#authService.getUserByCredentials(this.login_form().value() as AuthInterface);
                })).subscribe((user: UserInterface | undefined) => {
                    if (user !== undefined) {
                        this.appStore.authenticateUser(user_token, user);
                        // Navigate to home to avoid get stuck in loading
                        this.#router.navigate(['']);
                        this.notificationStore.addNotificationData('message', `Auth successful as ${user.name.firstname.toUpperCase()} ${user.name.lastname.toUpperCase()}`);
                    }
                });
        });
    }












    // public login_form = new FormGroup({
    //     username: new FormControl<string>('johnd', { nonNullable: true, validators: [Validators.required] }),
    //     password: new FormControl<string>('m38rmF$', { nonNullable: true, validators: [Validators.required] }),
    // });

    // public loginUser(): void {
    //     let user_token: string;
    //     if (this.login_form.invalid) {
    //         console.error('You must fill out all fields!');
    //         return;
    //     }

    // }

}
