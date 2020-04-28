import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(dateObj: Date) {
    // console.log(dateString);
    //'2019-11-01T10:30:17.694Z'
    
    var monthsArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const yearString = dateObj.getFullYear();
    const monthIndex = dateObj.getMonth()
    const monthString = monthsArray[+monthIndex];


    // const arraySplit = dateString.split('-');

    // const yearString = arraySplit[0];
    // const monthIndex = arraySplit[1];
    // const monthString = monthsArray[(+monthIndex)-1];

    const FinalString = monthString + ' ' + yearString ;

    return FinalString;
  }

}
