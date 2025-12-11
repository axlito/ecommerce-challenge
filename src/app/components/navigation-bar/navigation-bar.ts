import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from 'src/app/store/app-store';
import { RouterLink } from "@angular/router";
import { AuthStore } from 'src/app/store/auth-store';

@Component({
  selector: 'navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBar {
  readonly appStore = inject(AppStore);
  readonly authStore = inject(AuthStore);
}
