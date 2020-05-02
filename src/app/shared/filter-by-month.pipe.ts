import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../tasks/task.model';
import { BalanceItem } from '../balance/balanceItem.model';
// import { Task } from '../task.model';

@Pipe({
  name: 'filterByMonth'
})

export class FilterByMonthPipe implements PipeTransform { //##############################################

  transform(tasks: any[], monthStrInput: string[]) {
    // console.log('we are in thepiipe :');
    // console.log('we are in thepiipe :  this is the month input .' , monthStrInput);

    if (monthStrInput.length === 0) { return tasks }
    // console.log('we are in thepiipe :  this is the month input .' , monthStrInput);

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let finalArray: Task[] = [];

    tasks.forEach(el => {
      const monthIndex = el.date.getMonth();
      const monthString = monthsArray[+monthIndex];
      if (monthStrInput.indexOf(monthString) !== -1) { finalArray.push(el) }
    })
    // console.log('this is the final array ' , finalArray);

    return finalArray;

  }  //transform()

}  //class ###################################################################################################
