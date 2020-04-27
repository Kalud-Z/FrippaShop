import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject, Observable } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})

export class crudService { //#########################################################################
  tasksListChangedSubject = new Subject<Task[]>();

  tasksList: Task[] = [];

  constructor(private dataStorageService : DataStorageService) { }

  

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
      this.dataStorageService.storeTasksList(this.tasksList);
  }

  createNewTaskAndPush(type: string, alreadySent: boolean , details: string , id?:number , date?: Date , state?: string) {
    let correctDate : Date;
    if(!date) { correctDate = new Date() }
    else { correctDate = date }

    const task = this.createNewTask(type, alreadySent, details , id , correctDate);
    this.tasksList.push(task);
    this.tasksChangedNotify();

    if(state !== 'initial') {
      this.dataStorageService.storeTasksList(this.tasksList);
    }
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
    this.dataStorageService.storeTasksList(this.tasksList);
  } //updateTask()



  getTask(id : number): Task {
    let taskTemp: Task;
    this.tasksList.forEach(el => {
      if(el.id === id) { taskTemp = el }
    })
    return taskTemp;
  }

  getTasksList() {
    if(this.tasksList.length === 0) {
      const localStorageData = JSON.parse(localStorage.getItem('tasksList'));
      if(localStorageData && localStorageData.length !== 0) { this.pushToList(localStorageData) }
      else {
          this.dataStorageService.fetchTasksList().subscribe(data => {
          this.pushToList(data);
          localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
        })
      }
    }
    this.tasksChangedNotify();
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
  }


  private createNewTask(type: string, alreadySent: boolean , details: string , id?:number , date?: Date) {
    let correctID : number;
    if(id)  { correctID = id }
    else    { correctID = this.tasksList[this.tasksList.length - 1].id + 1 }
  
    const task = new Task(correctID , type , details , alreadySent , date);
    return task;
  }


  private pushToList(data: Array<any>) {
    data.forEach(el => {
      const type = el.type;
      const details = el.details;
      const id     = el.id;
      const alreadySent = el.isItemAlreadySent;

        //we create legit Date object from the fetched data
      const dateStr = el.date.substr(0 ,10);   // 2019-11-01
      const dateStrArray = dateStr.split('-');

      const year = parseInt(dateStrArray[0]) 
      const month = parseInt(dateStrArray[1]) 
      const day = parseInt(dateStrArray[2]) 

      var dateObj : Date = new Date();
      dateObj.setFullYear(year,month-1,day);

      //we create Task items and push them to the array.
      this.createNewTaskAndPush(type , alreadySent , details , id , dateObj , 'initial');
    })

  }



} //class ################################################################################################################################################
// #######################################################################################################################################################



