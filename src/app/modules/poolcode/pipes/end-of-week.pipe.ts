import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'ifEndOfWeek'})
export class EndOfWeekPipe implements PipeTransform {
  transform(pcDate: any, ...args: any[]): boolean {
    moment().isoWeekday();
    const momentElement = moment(pcDate, 'YYYY-MM-DD');
    // Any day less than 7 will have row class so the pipe should return true
    if ((momentElement.day()) % 7 === 0) {
        console.log('mod 7 === 0 returning true')
        return true;
    } else {
      console.log('returning false');
      return false;
    }
  }
}
