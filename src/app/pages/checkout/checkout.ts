import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breadcrumb } from "@components/breadcrumb/breadcrumb";
import { BreadcrumbInterface } from '@interfaces/breadcrumb';
import { AppStore } from '@store/app-store';
import { debounceTime, distinctUntilChanged, pipe } from 'rxjs';
import { Field, form, max, maxLength, min, minLength, pattern, required, submit, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { NotificationsStore } from '@store/notification-store';

interface CheckoutFormData {
    card: string,
    card_expire: string,
    card_code: string,
    full_name: string,
    address: string,
    zipcode: string,
    city: string,
}

@Component({
    selector: 'app-checkout',
    imports: [Breadcrumb, CurrencyPipe, ReactiveFormsModule, Field],
    templateUrl: './checkout.html',
    styleUrl: './checkout.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout {
    #router = inject(Router);
    appStore = inject(AppStore);
    notificationStore = inject(NotificationsStore);
    protected is_loading = signal<boolean>(false);
    readonly routes: BreadcrumbInterface[] = [
        { route: "", name: "Home" },
        { route: "/cart", name: "Your cart" },
        { route: "/cart/checkout", name: "Payment methods", current: true },
    ];

    checkout_model = signal<CheckoutFormData>({
        card: '',
        card_expire: '',
        card_code: '',
        full_name: `${this.appStore.auth_user()!.name.firstname} ${this.appStore.auth_user()!.name.lastname}`,
        address: `${this.appStore.auth_user()!.address.street} No. ${this.appStore.auth_user()!.address.number}`,
        zipcode: `No. ${this.appStore.auth_user()!.address.zipcode}`,
        city: this.appStore.auth_user()!.address.city,
    });

    checkout_form = form(this.checkout_model, (path) => {
        required(path.card, { message: 'Card number is required' });
        pattern(path.card, /(?<!\d)\d{16}(?!\d)/, { message: 'Card number must be valid' });

        required(path.card_expire, { message: 'Card expiry date is required' });
        pattern(path.card_expire, /(?<!\d)\d{4}-\d{2}(?!\d)/, { message: 'Expiry date must be valid' });
        validate(path.card_expire, ({ value }) => {
            if (!value) return null;
            const today = new Date();
            const input_date = new Date(value());
            if (input_date < today) {
                return { kind: 'error', message: 'Expiry date must be valid' };
            }
            return null;
        });

        required(path.card_code, { message: 'Card code is required' });
        pattern(path.card_code, /(?<!\d)\d{3}(?!\d)/, { message: 'Card code must be valid' });

        required(path.full_name, { message: 'User information is required' });
        pattern(path.full_name, /(\w+ \w+)/, { message: 'Enter name and lastname' });

        required(path.zipcode, { message: 'Zipcode is required' });
        required(path.address, { message: 'User address is required' });
        required(path.city, { message: 'User address is required' });
    });

    public isFieldInvalid(name: keyof CheckoutFormData) {
        const field = this.checkout_form[name];
        if (!field) return;
        return field() && field().touched() && field().errors().length > 0;
    }

    onSubmit(event: Event) {
        event.preventDefault();

        submit(this.checkout_form, async () => {
            this.is_loading.set(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            this.postCheckout();
        });
    }

    public postCheckout(): void {
        this.is_loading.set(true);
        console.log({
            form: this.checkout_form().value(),
            valid: this.checkout_form().valid(),
        });
        this.notificationStore.addNotificationData('message', ' Your payment has been confirmed, check your email for more details');
        this.appStore.resetCart();
        this.#router.navigate(['']);
    }

}
