import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'rating-stars',
    imports: [],
    templateUrl: './rating-stars.html',
    styleUrl: './rating-stars.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStars {
    readonly rating = input.required<number>();

    public getRatingData(): number[] {
        let aux: number[] = [-1, -1, -1, -1, -1];
        if (this.rating() % 1 === 0) {
            for (let i = 0; i < this.rating(); i++) {
                aux[i] = 1;
            }
        } else {
            for (let i = 0; i < Math.floor(this.rating()); i++) {
                aux[i] = 1;
            }
            aux[Math.floor(this.rating())] = 0;
        }
        return aux;
    }
}
