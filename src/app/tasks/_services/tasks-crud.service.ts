import { Injectable } from '@angular/core';
import { Task } from '../task.model';

import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



import { DataStorageService } from '../../shared/_services/data-storage.service';



@Injectable({
  providedIn: 'root'
})

// ####################################################################################################################################################
export class tasksCrudService { //ng##########################################################################################################################
  tasksList: Task[] = [];

  tasksListChanged$ = new Subject<Task[]>();

  sentDataToTasksNow = false;
  
  constructor(private dataStorageService : DataStorageService) { }




  deleteTask(id : number) {
      this.tasksList.forEach((el, index) => {
        if(el.id === id) { this.tasksList.splice(index, 1) }
      })
      this.tasksChangedNotify();

      this.dataStorageService.storeTasksList(this.tasksList).subscribe(() => {
        localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
      });
  }



  createNewTaskAndPush(type: string, alreadySent: boolean , details: string , id?:number , date?: Date , state?: string) {
    let correctDate : Date;
    if(!date) { correctDate = new Date() }
    else { correctDate = date }
    const task = this.createNewTask(type, alreadySent, details , id , correctDate);


    this.tasksList.push(task);
    if(this.sentDataToTasksNow) { this.tasksChangedNotify() }

    if(state && state === 'store') {
      this.dataStorageService.storeTasksList(this.tasksList).subscribe(() => {
        localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
      });
    }

  } //createNewTask()



  updateTask(id : number , type: string, alreadySent: boolean , details: string) {
    const task = this.createNewTask(type , alreadySent , details , id)
    this.tasksList.forEach(el => {
      if(el.id === task.id) {
        el.type = task.type;
        el.isItemAlreadySent = task.isItemAlreadySent;
        el.details = task.details;  
      }
    })
    this.tasksChangedNotify();
    this.dataStorageService.storeTasksList(this.tasksList).subscribe(() => {
      localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
    });
  } //updateTask()



  getTask(id : number): Task {
    let taskTemp: Task;
    this.tasksList.forEach(el => {
      if(el.id === id) { taskTemp = el }
    })
    return taskTemp;
  }
  


  getTasksList() {
    if(this.tasksList.length === 0 && environment.useLocalStorage) { // memory still empty . we fetch from localStorage (if we are allowed)
      const localStorageData = JSON.parse(localStorage.getItem('tasksList'));
      if(localStorageData && localStorageData.length !== 0) {  this.pushToList(localStorageData) }
    }

    if(this.tasksList.length > 0) { this.tasksChangedNotify() }
    else {  // fetch stuff from dataBase
        this.dataStorageService.fetchTasksList().subscribe(data => {
        this.pushToList(data);
        localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
      })
    }

  } //getTasksList


  /* fixingListDates() {
    // console.log('this fuindate funciton')

    this.tasksList.forEach(el => {
      if(el.id >= 398  &&  el.id <= 439) {
        // el.date = "2019-12-01";
      }
    })

    this.tasksChangedNotify();

  } */




  // ###########################################################################   PRIVATE  ##################################################################
  
  private tasksChangedNotify() {
    this.tasksListChanged$.next(this.tasksList.slice());
  }



  private createNewTask(type: string, alreadySent: boolean , details: string , id?:number , date?: Date) {
    let correctID : number;
    if(id)  { correctID = id }
    else    { correctID = this.tasksList[this.tasksList.length - 1].id + 1 }
  
    const task = new Task(correctID , type , details , alreadySent , date);
    return task;
  }



  private pushToList(data: Array<any>) {
    const arrayLength = data.length;
    data.forEach((el, index) => {
      const type        = el.type;
      const details     = el.details;
      const id          = el.id;
      const alreadySent = el.isItemAlreadySent;

      //we create legit Date object from the fetched data
      const dateStr = el.date.substr(0 ,10);   // 2019-11-01
      const dateStrArray = dateStr.split('-');

      const year  = parseInt(dateStrArray[0]) 
      const month = parseInt(dateStrArray[1]) 
      const day   = parseInt(dateStrArray[2]) 

      let dateObj : Date = new Date();
      dateObj.setFullYear(year,month-1,day);

      if(index === arrayLength-1) {
        this.sentDataToTasksNow = true;
      } 
      this.createNewTaskAndPush(type , alreadySent , details , id , dateObj);
    })

  }//pushToList






































  // in case data on server are lost . call it upon fetching.
  /* private repairData() {
    
    const array =  [{"id":440,"type":"shoes","details":"terrex 260 . 40 2/3","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.673Z"},{"id":441,"type":"shoes","details":"ultraboost . 44 2/3 . green","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.674Z"},{"id":442,"type":"shoes","details":"adidas toy story","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.674Z"},{"id":443,"type":"shoes","details":"adidas packer . 45 1/3","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.674Z"},{"id":444,"type":"shoes","details":"adizero boston. 42","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.674Z"},{"id":445,"type":"shoes","details":"adizero boston 8 . 44 2/3 ","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.674Z"},{"id":446,"type":"shoes","details":"Ultraboost . 46 2/3","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.674Z"},{"id":447,"type":"shoes","details":"adidas paley . 42 . white","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.675Z"},{"id":448,"type":"shoes","details":"adidas boost . 40 2/3","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":449,"type":"shoes","details":"adidas solar glide. 45 1/3","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.675Z"},{"id":450,"type":"other","details":"garmin HR belt . blue ","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":451,"type":"other","details":"adidas jacket. S . grey ","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":452,"type":"other","details":"adidas running long tights . black","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":453,"type":"other","details":"Adidas running short 3/4 . blur ","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":454,"type":"other","details":"adidas running long tights . black","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":455,"type":"other","details":"adidas running long tights . black","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.675Z"},{"id":456,"type":"other","details":"adidas running long tights . black","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":457,"type":"shoes","details":"adizero boston. 44 . beige ","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.675Z"},{"id":458,"type":"shoes","details":"pure Boston . 45 1/3","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.675Z"},{"id":459,"type":"shoes","details":"solar boost . 38","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.675Z"},{"id":460,"type":"shoes","details":"Ultraboost . 46","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.676Z"},{"id":461,"type":"shoes","details":"Reebok CrossFit . 41 ","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.676Z"},{"id":462,"type":"shoes","details":"Adidas stan Smith . 40","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.676Z"},{"id":463,"type":"shoes","details":"Adizero Prime . 41 1/3","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.676Z"},{"id":464,"type":"shoes","details":"Adizero boston . 41:1/3","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.676Z"},{"id":465,"type":"shoes","details":"boost . 40","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.676Z"},{"id":466,"type":"shoes","details":"solar glide . 39 1/3","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.676Z"},{"id":467,"type":"shoes","details":"Solar glide . 40","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.676Z"},{"id":468,"type":"shoes","details":"solar glide . 44","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.676Z"},{"id":469,"type":"shipment","details":"Bremen . 5Kg","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.676Z"},{"id":470,"type":"shoes","details":"adidas boost . 38 ","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.676Z"},{"id":471,"type":"shoes","details":"adidas boost . 40 2/3","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.676Z"},{"id":472,"type":"shoes","details":"adidas boost . 45 1/3","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.677Z"},{"id":473,"type":"shoes","details":"adizero boston . 44","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.677Z"},{"id":474,"type":"shoes","details":"solar boost . 39 1/3","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.677Z"},{"id":475,"type":"watch","details":"Garmin fenix 5 . state : not tested","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.677Z"},{"id":476,"type":"shoes","details":"Soloman . 40","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.677Z"},{"id":477,"type":"shoes","details":"Hoka. 40","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.677Z"},{"id":478,"type":"shoes","details":"soloman s . 44","isItemAlreadySent":true,"date":"2020-01-01T12:41:34.677Z"},{"id":479,"type":"other","details":"sunglasses . For Ahmed ","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.677Z"},{"id":480,"type":"other","details":"screen protectors. for Ahmed","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.677Z"},{"id":481,"type":"shipment","details":"nadia","isItemAlreadySent":false,"date":"2020-01-01T12:41:34.677Z"},{"id":482,"type":"other","details":"bracelet","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.677Z"},{"id":483,"type":"other","details":"adidas sweater . grey (For Ahmed)","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.677Z"},{"id":484,"type":"shoes","details":"adidas parley . 40 2/3","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.678Z"},{"id":485,"type":"shoes","details":"solar glide st . 41 1/3","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.678Z"},{"id":486,"type":"shoes","details":"saucony . 38","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.678Z"},{"id":487,"type":"shoes","details":"brooks . 45","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.678Z"},{"id":488,"type":"shoes","details":"terrex . 43 1/3","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.678Z"},{"id":489,"type":"shoes","details":"Ultra boost . 41 1/3","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.678Z"},{"id":490,"type":"shoes","details":"solar glide st. 43 1/3","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.678Z"},{"id":491,"type":"shoes","details":"adidas pants. blue ","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.678Z"},{"id":492,"type":"shoes","details":"adidas boost. 40","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.678Z"},{"id":493,"type":"shoes","details":"scarpa . 43","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.678Z"},{"id":494,"type":"watch","details":"Fenix 3HR . State : perfect","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.678Z"},{"id":495,"type":"shoes","details":"Ultraboost . 40 2/3","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.678Z"},{"id":496,"type":"shoes","details":"Salming . 38 2/3","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.678Z"},{"id":497,"type":"shoes","details":"Everrun . 37.5","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.678Z"},{"id":498,"type":"shoes","details":"Energy boost 37 1/3","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.679Z"},{"id":499,"type":"watch","details":"Fenix 3 . state : perfect","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":500,"type":"watch","details":"Fenix 3 HR . State : perfect","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":501,"type":"watch","details":"Garmin : forerunner 235 . state : buttons burnt. Button doesnt work","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.679Z"},{"id":502,"type":"watch","details":"Fenix 3HR . state : perfect","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":503,"type":"shoes","details":"Energy boost . 42","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":504,"type":"shoes","details":"Adidas Boost . 36 2/3","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.679Z"},{"id":505,"type":"watch","details":"Fenix 5s. Refurbished","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":506,"type":"shipment","details":"Zghidi . Frnace . 5kg","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.679Z"},{"id":507,"type":"watch","details":"Fenix 5 plus . state : perfect","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":508,"type":"watch","details":"Fenix 5 . state : perfect","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":509,"type":"shoes","details":"Boost . 40","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.679Z"},{"id":510,"type":"shoes","details":"Terrex . 40","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.679Z"},{"id":511,"type":"shoes","details":"adizero adios. 38","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.679Z"},{"id":512,"type":"shoes","details":"adizero boston. 38","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.680Z"},{"id":513,"type":"shoes","details":"aeroready . 42 sth.","isItemAlreadySent":false,"date":"2020-02-01T12:41:34.680Z"},{"id":514,"type":"watch","details":"vivo active HR . state : perfect","isItemAlreadySent":true,"date":"2020-02-01T12:41:34.680Z"},{"id":515,"type":"watch","details":"garmin forerunner 30. state : Perfect","isItemAlreadySent":true,"date":"2020-03-01T12:41:34.680Z"},{"id":516,"type":"watch","details":"Fenix 5 plus . state : NEW","isItemAlreadySent":true,"date":"2020-03-01T12:41:34.680Z"},{"id":517,"type":"watch","details":"Fenix 3 . State : Perfect","isItemAlreadySent":true,"date":"2020-03-01T12:41:34.680Z"},{"id":518,"type":"shoes","details":"Boost . 46 2/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.680Z"},{"id":519,"type":"watch","details":"Forerunner 920 xt + 2 HR belt + Bike sleed sensor . state : Perfect","isItemAlreadySent":true,"date":"2020-03-01T12:41:34.680Z"},{"id":520,"type":"watch","details":"Forerunner . 735 XT . state : Perfect","isItemAlreadySent":true,"date":"2020-03-01T12:41:34.680Z"},{"id":521,"type":"watch","details":"Fenix 3 . State : Perfect","isItemAlreadySent":true,"date":"2020-03-01T12:41:34.680Z"},{"id":522,"type":"shipment","details":"Lass3ed . France . 5kg","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.680Z"},{"id":523,"type":"shipment","details":"fairouz . France . 10kg","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.680Z"},{"id":524,"type":"shoes","details":"Primeblue . 46","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.680Z"},{"id":525,"type":"shoes","details":"Adizero adios 5 . 40 2/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":526,"type":"shoes","details":"columbia montreal . 40 ","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":527,"type":"shoes","details":"Hoka . 43;1/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":528,"type":"other","details":"Terrex Veste . black ","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":529,"type":"shoes","details":"Terrex . 40","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":530,"type":"shoes","details":"adizero prime . 43 1/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":531,"type":"shoes","details":"boost . 38 2/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":532,"type":"shoes","details":"boost. 46 2/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":533,"type":"shoes","details":"terrex. 40 2/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":534,"type":"shoes","details":"adizero . 42 2/3","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":535,"type":"other","details":"adidas . sweater . ","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":536,"type":"shoes","details":"terrex . red . 40","isItemAlreadySent":false,"date":"2020-03-01T12:41:34.681Z"},{"id":537,"type":"watch","details":"testttt","isItemAlreadySent":false,"date":"2020-04-28T11:42:29.072Z"}] ; 
    this.pushToList(array);
    this.tasksChangedNotify();
  } */


} //class ################################################################################################################################################
// #######################################################################################################################################################



