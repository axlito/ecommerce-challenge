import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortDescription', standalone: true })
export class ShortDescriptionPipe implements PipeTransform {
    transform(value: string, size: number): string {
        return (value.length < size) ? value : `${value.substring(0, size)} ...`;
    }
}