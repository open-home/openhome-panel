import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(number?: number): any {
    return number.toFixed(1);
  }
}
