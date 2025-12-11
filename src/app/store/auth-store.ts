import { inject } from '@angular/core';
import { User } from '@interfaces/user';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
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

    })),
    withMethods((store, authService = inject(AuthService)) => ({

    }))

);