import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from 'src/app/store/app-store';

@Component({
  selector: 'navigation-bar',
  imports: [],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBar {
  readonly store = inject(AppStore);
}
