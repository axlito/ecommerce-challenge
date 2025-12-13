import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppStore } from '@store/app-store';

@Component({
    selector: 'app-user',
    templateUrl: './user.html',
    styleUrl: './user.css',
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class User {
    appStore = inject(AppStore);
    #router = inject(Router);

    public logoutUser(): void {
        this.appStore.deauthenticateUser();
        this.#router.navigate(['']);
    }

}
