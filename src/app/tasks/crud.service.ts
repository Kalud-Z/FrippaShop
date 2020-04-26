import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})

export class crudService { //#########################################################################
  tasksListChangedSubject = new Subject<Task[]>();

  tasksList: Task[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  

  setTasksList(newList: Task[]) {
    // this.tasksList = newList;
    newList.forEach(el => { this.tasksList.push(el) })
    this.tasksChangedNotify();
  }

  deleteTask(id : number) {
      this.tasksList.forEach( (el, index) => {
        if(el.id === id) { this.tasksList.splice(index, 1) }
      })
      this.tasksChangedNotify();
  }

  createNewTaskAndPush(type: string, alreadySent: boolean , details: string , id?:number , date?: Date) {
    const task = this.createNewTask(type, alreadySent, details , id , date);
    this.tasksList.push(task);
    this.tasksChangedNotify();
  } //createNewTask()


  updateTask(id : number , type: string, alreadySent: boolean , details: string) {

    const task = this.createNewTask(type , alreadySent , details , id)
    this.tasksList.forEach( (el , index) => {
      // console.log('el id : ' , el.id)
        // console.log('task id, ' , task.id)
      if(el.id === task.id) {
        Object.assign(el , task);   
      }
    })
    this.tasksChangedNotify();
  } //updateTask()



  getTask(id : number): Task {
    let taskTemp: Task;
    this.tasksList.forEach(el => {
      if(el.id === id) { taskTemp = el }
    })
    return taskTemp;
  }

  getTasksList() {
    return this.tasksList.slice();
    this.tasksChangedNotify()
  }
  



  fixingListDates() {
    // console.log('this fuindate funciton')

    this.tasksList.forEach(el => {
      if(el.id >= 398  &&  el.id <= 439) {
    
        // el.date = "2019-12-01";
      }
    })

    this.tasksChangedNotify();

  }




  // ###########################################################################   PRIVATE ##################################################################
  private tasksChangedNotify() {
    this.tasksListChangedSubject.next(this.tasksList.slice());
    this.dataStorageService.storeTasksList();
    // console.log(' list ' , this.tasksList);

  }


  private createNewTask(type: string, alreadySent: boolean , details: string , id?:number , date?: Date) {
    let correctID : number;
    if(id)  { correctID = id }
    else    { correctID = this.tasksList[this.tasksList.length - 1].id + 1 }
  
    const task = new Task(correctID , type , details , alreadySent , date);
    return task;
  }



} //class ################################################################################################################################################
// #######################################################################################################################################################



