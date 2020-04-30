import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayInEuro'
})
export class DisplayInEuroPipe implements PipeTransform {

  transform(value: number) {
    if(!value) { return value }
    return value + '€'
  }

}
