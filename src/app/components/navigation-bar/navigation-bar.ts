import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from '@store/app-store';
import { RouterLink } from "@angular/router";
import { DebugStoreDirective } from "src/app/directives/debug-store";

@Component({
    selector: 'navigation-bar',
    imports: [RouterLink, DebugStoreDirective],
    templateUrl: './navigation-bar.html',
    styleUrl: './navigation-bar.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBar {
    appStore = inject(AppStore);
}
