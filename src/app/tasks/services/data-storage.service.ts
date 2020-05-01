import { Injectable } from "@angular/core";
import { crudService } from "./crud.service";
import { HttpClient } from "@angular/common/http";
import { Task } from "../task.model";
import { Subject, BehaviorSubject } from "rxjs";
import { FileSaverService } from "ngx-filesaver";
import { AuthService } from 'src/app/login/auth.service';
import { take , tap, exhaustMap } from "rxjs/operators";
import { BalanceItem } from 'src/app/balance/balanceItem.model';

@Injectable({
  providedIn: "root",
})

// ####################################################################################################################################################
export class DataStorageService {
  //###################################################################################################################

  constructor(
    private http: HttpClient,
    private fileSaverService: FileSaverService,
    private authService : AuthService
  ) {}

// AIzaSyDIVA6P44Okinr0qT4z9XzJCpzX1qRDuwo

  storeTasksList(list: Task[]) {
    // console.log('we are storing now')
    return  this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      console.log('this isthe token : ' , userData.token);
       return this.http.put("https://frippashop.firebaseio.com/TasksList.json?auth=" + userData.token , list);
      
      // this.downloadTable(list);
    }))
  }

  fetchTasksList() {
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.get<any[]>("https://frippashop.firebaseio.com/TasksList.json?auth=" + userData.token);
    }))

  }



  storeBalanceItemsList(list: BalanceItem[]) {
      return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
        // console.log('this isthe token : ' , userData.token)
        return this.http.put("https://frippashop.firebaseio.com/BalanceItemsList.json?auth=" + userData.token , list)
      })) 

        // this.downloadTable(list);
    
  }


  fetchBalanceItemsList() {
    // return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
    //   return this.http.get<any[]>("https://frippashop.firebaseio.com/TasksList.json?auth=" + userData.token);
    // }))

    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.get<any[]>("https://frippashop.firebaseio.com/BalanceItemsList.json?auth=" + userData.token);
    }))


    // return this.http.get<any[]>("https://frippashop.firebaseio.com/BalanceItemsList.json");
  }
 



  // #############################################################################  PRIVATE ##############################################################

  private downloadTable(list: Task[]) {
    const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    
    const lastTaskAdded = list[list.length - 1];
    const dateObj = lastTaskAdded.date;
    const monthIndex = dateObj.getMonth();
    const monthString = monthsArray[+monthIndex];
    const yearString = dateObj.getFullYear();
    const id = lastTaskAdded.id;

    const text = JSON.stringify(list);
    const fileName = `Table-ID${id}-${monthString}${yearString}.json`;
    const fileType = this.fileSaverService.genType(fileName);
    const txtBlob = new Blob([text], { type: fileType });
    this.fileSaverService.save(txtBlob, fileName);
  } //onSaveButton
} //class #################################################################################################################################################
// ########################################################################################################################################################
