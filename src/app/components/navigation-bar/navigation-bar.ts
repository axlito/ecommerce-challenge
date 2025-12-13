import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from '@store/app-store';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'navigation-bar',
    imports: [RouterLink],
    templateUrl: './navigation-bar.html',
    styleUrl: './navigation-bar.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBar {
    appStore = inject(AppStore);
}
