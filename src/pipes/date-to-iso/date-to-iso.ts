import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DateToIsoPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dateToIso',
})
export class DateToIsoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
        let newValue = new Date(value).toISOString();
        return newValue;
  }
}
