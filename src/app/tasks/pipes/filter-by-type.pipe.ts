import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {


  transform(tasks: Task[], typeInput: string) {
    if (!typeInput || typeInput === '') { return tasks }

    let finalArray: Task[] = [];

    tasks.forEach(el => {
      if(el.type === typeInput) { finalArray.push(el) }
    })
    return finalArray;

  }  //transform()




}
