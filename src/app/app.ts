import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBar } from '@components/navigation-bar/navigation-bar';
import { Notification } from "@components/notification/notification";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavigationBar, Notification],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('ecommerce-challenge');
}
