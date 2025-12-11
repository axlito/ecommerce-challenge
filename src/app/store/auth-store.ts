import { computed, inject } from '@angular/core';
import { User } from '@interfaces/user';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@services/auth-service';

type AuthState = {
    user: User | undefined;
    token: string;
};

const initialState: AuthState = {
    user: undefined,
    token: "",
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        isUserAuthenticated: computed(() => {
            const user = state.user();
            return user !== undefined;
        })
    })),
    withMethods((store, authService = inject(AuthService)) => ({
        authenticateUser(token: string, user: User): void {
            patchState(store, {
                token: token,
                user: user
            });
        },
        deauthenticateUser(): void {
            patchState(store, {
                token: "",
                user: undefined
            });
        }
    }))

);