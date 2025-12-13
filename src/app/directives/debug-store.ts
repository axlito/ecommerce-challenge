import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';
import { AppStore } from '@store/app-store';

@Directive({
    selector: '[debugStore]'
})
export class DebugStoreDirective {
    appStore = inject(AppStore);

    @HostListener('click') onMouseClick() {
        console.log(this.appStore.product_list());
    }
}