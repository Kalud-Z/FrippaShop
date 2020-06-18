import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../address.model';

@Pipe({
  name: 'filterByCountry'
})
export class FilterByCountryPipe implements PipeTransform {

  transform(addressList: Address[], countryStrInput: string[]) {  
    if (countryStrInput.length === 0) { return addressList }

    // const countriesArray = ['ghana' , 'France'];

    let finalArray: Address[] = [];

    addressList.forEach(el => {
      if (countryStrInput.indexOf(el.country) !== -1) { finalArray.push(el) }
    })
  

    return finalArray;

  }  //transform()


}
