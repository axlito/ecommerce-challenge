import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationsStore } from '@store/notification-store';

@Component({
    selector: 'notification',
    imports: [],
    templateUrl: './notification.html',
    styleUrl: './notification.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Notification {
    notificationStore = inject(NotificationsStore);
}
