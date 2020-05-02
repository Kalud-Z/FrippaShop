import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../tasks/task.model';


@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {


  transform(tasks: Task[], typeInput: string[]) {
    if (typeInput.length === 0) { return tasks }

    let finalArray: Task[] = [];

    tasks.forEach(el => {
      if(typeInput.indexOf(el.type) !== -1) { finalArray.push(el) }
    })
    return finalArray;

  }  //transform()




}
