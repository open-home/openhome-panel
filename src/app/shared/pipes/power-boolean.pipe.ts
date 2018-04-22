import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerBoolean'
})
export class PowerBooleanPipe implements PipeTransform {

  transform(power?: any): any {
    return power === 'on' ? true : false;
  }
}
