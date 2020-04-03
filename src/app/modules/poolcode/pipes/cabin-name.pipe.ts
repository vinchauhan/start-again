import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cabinName'})
export class CabinNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    switch (value) {
      case 'Y': {
        return 'Business Class';
        break;
      }
      case 'C': {
        return 'Economy Class';
        break;
      }
      default: {
        return 'Unknown Class';
        break;
      }
    }
  }
}
