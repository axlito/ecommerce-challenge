import { computed, effect } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

type NotificationsState = {
    notification: { type?: string, message?: string; },
};

const initialState: NotificationsState = {
    notification: {},
};

export const NotificationsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        addNotificationData(type: string, message: string): void {
            patchState(store, { notification: { type, message } });
        },
        delNotificationData(): void {
            patchState(store, { notification: {} });
        },
    })),
    withHooks({
        onInit(store) {
            effect(() => {
                if (store.notification().type) {
                    setTimeout(() => {
                        patchState(store, { notification: {} });
                    }, 5000);
                }
            });
        },
    }),
);