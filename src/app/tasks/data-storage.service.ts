import { Injectable } from '@angular/core';
import { crudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})

// ####################################################################################################################################################
export class DataStorageService { //###################################################################################################################
  addDirectiveSubject = new BehaviorSubject<boolean>(false);


  constructor(private crudService : crudService,
              private http : HttpClient,
              private fileSaverService: FileSaverService
              ) { }




  storeTasksList() {
    const list = this.crudService.getTasksList();
    this.http.put('https://frippashop.firebaseio.com/TasksList.json' , list).subscribe()
    // localStorage.clear();
    localStorage.removeItem('tasksList');

    //download the file 
    this.downloadTable();

  }

  
  fetchTasksList() {
      const localStorageData = JSON.parse(localStorage.getItem('tasksList'));
      if(localStorageData) {
        console.log('data fetched from local storage')
        this.pushToList(localStorageData);
      }

      else {
        this.http.get<any[]>('https://frippashop.firebaseio.com/TasksList.json').subscribe(data => {
          this.pushToList(data);
          localStorage.setItem('tasksList', JSON.stringify(this.crudService.tasksList));
        })
      }
  }


  private pushToList(data: Array<any>) {

    // console.log('this is from sorgae : ' , data);

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
      this.crudService.createNewTaskAndPush(type , alreadySent , details , id , dateObj);
    })

  }
  



  // #############################################################################  PRIVATE ##############################################################

  
  downloadTable() {
    const monthsArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const lastTaskAdded = this.crudService.tasksList[this.crudService.tasksList.length-1]; 
    const dateObj = lastTaskAdded.date;
    const monthIndex = dateObj.getMonth()
    const monthString = monthsArray[+monthIndex];
    const yearString = dateObj.getFullYear();
    const id  = lastTaskAdded.id;

    const text = JSON.stringify(this.crudService.tasksList);
    const fileName = `Table-ID${id}-${monthString}${yearString}.json`
    const fileType = this.fileSaverService.genType(fileName);
    const txtBlob = new Blob([text], { type: fileType });
    this.fileSaverService.save(txtBlob, fileName);
  } //onSaveButton






} //class #################################################################################################################################################
// ########################################################################################################################################################


