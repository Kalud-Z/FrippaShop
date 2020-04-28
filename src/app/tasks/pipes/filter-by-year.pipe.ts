import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  name: 'filterByYear'
})
export class FilterByYearPipe implements PipeTransform {

 
  transform(tasks: Task[], yearInput: number) {
    if (!yearInput) { return tasks }

    let finalArray: Task[] = [];

    tasks.forEach(el => {
      const year = el.date.getFullYear();
      if(year === yearInput) { finalArray.push(el) }
    })
    return finalArray;

  }  //transform()

}
