import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breadcrumb } from "@components/breadcrumb/breadcrumb";
import { BreadcrumbInterface } from '@interfaces/breadcrumb';
import { AppStore } from '@store/app-store';
import { debounceTime, distinctUntilChanged, pipe } from 'rxjs';

@Component({
    selector: 'app-checkout',
    imports: [Breadcrumb, CurrencyPipe, ReactiveFormsModule],
    templateUrl: './checkout.html',
    styleUrl: './checkout.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout implements OnInit {
    appStore = inject(AppStore);
    readonly routes: BreadcrumbInterface[] = [
        { route: "", name: "Home" },
        { route: "/cart", name: "Your cart" },
        { route: "/cart/checkout", name: "Payment methods", current: true },
    ];

    public payment_form = new FormGroup({
        card: new FormControl<string>("1234123412341234", { nonNullable: true, validators: [Validators.required, Validators.maxLength(16), Validators.minLength(16), Validators.pattern('^[0-9]*$')] }),
        card_month: new FormControl<number>(8, { nonNullable: true, validators: [Validators.required, Validators.maxLength(2)] }),
        card_year: new FormControl<number>(2026, { nonNullable: true, validators: [Validators.required, Validators.maxLength(4), Validators.minLength(4)] }),
        card_code: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
        name: new FormControl<string>(this.appStore.auth_user()!.name.firstname, { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        lastname: new FormControl<string>(this.appStore.auth_user()!.name.lastname, { nonNullable: true, validators: [Validators.required] }),
        facturation: new FormControl<string>(`${this.appStore.auth_user()!.address.street} ${this.appStore.auth_user()!.address.zipcode}`, { nonNullable: true, validators: [Validators.required] }),
        address: new FormControl<string>(this.appStore.auth_user()!.address.number.toString(), { nonNullable: true, validators: [Validators.required] }),
        city: new FormControl<string>(this.appStore.auth_user()!.address.city, { nonNullable: true, validators: [Validators.required] }),
    });

    ngOnInit(): void {
        this.payment_form.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe((form) => {

        });
    }

    public proceedPayment(): void {
        if (this.payment_form.invalid) {
            console.error(this.payment_form.errors);
            return;
        }
    }

}
