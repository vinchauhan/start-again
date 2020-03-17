import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'dateFormater'})
export class DateFormatter implements PipeTransform {
    transform(value: any, ...args: any[]): string {
       let formattedDate = "";
       let tokens = value.split('-');
       return tokens[1] + '/' + tokens[2];
    }
}
