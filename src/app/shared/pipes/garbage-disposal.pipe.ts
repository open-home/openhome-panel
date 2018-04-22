import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'garbageDisposal'
})
export class GarbageDisposalPipe implements PipeTransform {

  transform(garbageCollection?: any): any {

    switch (garbageCollection) {

      case 'v':
        return 'Glass';

      case 'c':
        return 'Paper';

      case 'i':
        return 'Undifferentated';

      case 'o':
        return 'Organic';

      case 'p':
        return 'Plastic/Metals';
    }
  }
}
