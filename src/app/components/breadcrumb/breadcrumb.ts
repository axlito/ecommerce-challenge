import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumbs } from '@interfaces/breadcrumb';

@Component({
    selector: 'breadcrumb',
    imports: [RouterLink],
    templateUrl: './breadcrumb.html',
    styleUrl: './breadcrumb.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Breadcrumb {
    readonly routes = input.required<Breadcrumbs[]>();
}
