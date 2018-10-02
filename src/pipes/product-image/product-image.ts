import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../../app/app.config';
/**
 * Generated class for the ProductImagePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private appConfig: AppConfig) {

  }


  transform(value: string, ...args) {
    // return `https://nlpapps.xyz/${value}`
    // return `http://sls248.com/${value}`
    return `${this.appConfig.imageurl}/${value}`
  }
}
