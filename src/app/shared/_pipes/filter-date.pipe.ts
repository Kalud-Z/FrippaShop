import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(dateObj: Date, includeDay?: boolean) {
    //'2019-11-01T10:30:17.694Z'

    var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const yearString = dateObj.getFullYear();
    const monthIndex = dateObj.getMonth()
    const monthString = monthsArray[+monthIndex];
    const dayString = dateObj.getDate();

    let FinalString;

    if (includeDay) {
      FinalString = dayString + '-' + monthString + '-' + yearString;
    } else {
      FinalString = monthString + ' ' + yearString;
    }

    return FinalString;
  }

}
