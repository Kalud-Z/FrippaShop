import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  name: 'filterByAlreadySent'
})
export class FilterByAlreadySentPipe implements PipeTransform {


  
  transform(tasks: Task[], typeInput: boolean) {
    if ( typeInput === undefined ) { return tasks }

    let finalArray: Task[] = [];

    tasks.forEach(el => {
      if(el.isItemAlreadySent === typeInput) { finalArray.push(el) }
    })
    return finalArray;

  }  //transform()





}
