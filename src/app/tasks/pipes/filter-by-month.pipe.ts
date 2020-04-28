import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  name: 'filterByMonth'
})

export class FilterByMonthPipe implements PipeTransform { //##############################################

  transform(tasks: Task[], monthStrInput: string) {
    if (!monthStrInput || monthStrInput === '') { return tasks }

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let finalArray: Task[] = [];

    tasks.forEach(el => {
      const monthIndex = el.date.getMonth();
      const monthString = monthsArray[+monthIndex];
      if (monthString === monthStrInput) { finalArray.push(el) }
    })
    return finalArray;

  }  //transform()

}  //class ###################################################################################################
