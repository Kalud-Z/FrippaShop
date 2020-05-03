import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../address.model';

@Pipe({
  name: 'filterByCity'
})
export class FilterByCityPipe implements PipeTransform {

  transform(addressList: Address[], cityStrInput: string[]) {  
    if (cityStrInput.length === 0) { return addressList }

    // const countriesArray = ['ghana' , 'France'];

    let finalArray: Address[] = [];

    addressList.forEach(el => {
      if (cityStrInput.indexOf(el.city) !== -1) { finalArray.push(el) }
    })
  

    return finalArray;

  }  //transform()


}
