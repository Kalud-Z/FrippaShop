import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { FileSaverService } from "ngx-filesaver";
import { take , exhaustMap } from "rxjs/operators";
import { environment } from 'src/environments/environment';


import { Task } from "../../tasks/task.model";
import { AuthService } from 'src/app/login/_services/auth.service';
import { BalanceItem } from 'src/app/balance/balanceItem.model';
import { Address } from 'src/app/address-book/address.model';



@Injectable({
  providedIn: "root",
})

// #######################################################################################################################################################
export class DataStorageService { //#######################################################################################################################

  constructor(
    private http: HttpClient,
    private fileSaverService: FileSaverService,
    private authService : AuthService
  ) {}




  storeTasksList(list: Task[]) {
    // U download the latest version of the table before touchin the database on the server.
    this.downloadTable(list);
    return  this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
       return this.http.put("https://frippashop.firebaseio.com/TasksList.json?auth=" + userData.token , list);
      // this.downloadTable(list);
    }))
  }




  fetchTasksList() {
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.get<any[]>("https://frippashop.firebaseio.com/TasksList.json?auth=" + userData.token);
    }))

  }


  // ##################################################################################################################################################


  storeBalanceItemsList(list: BalanceItem[]) {
      this.downloadTable(list);
      return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
        return this.http.put("https://frippashop.firebaseio.com/BalanceItemsList.json?auth=" + userData.token , list)
      })) 
  }


  fetchBalanceItemsList() {
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.get<any[]>("https://frippashop.firebaseio.com/BalanceItemsList.json?auth=" + userData.token);
    }))
  }
 


  // ######################################################################################################################################################


  storeAddressList(list: Address[]) {
    this.downloadTable(list);
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.put("https://frippashop.firebaseio.com/AddressList.json?auth=" + userData.token , list)
    })) 
}


  fetchAddressList() {
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.get<any[]>("https://frippashop.firebaseio.com/AddressList.json?auth=" + userData.token);
    }))
  }


// ####################################################   PRIVATE  #####################################################################################


  private downloadTable(list: any[]) {
    if(environment.downloadTable) {
      const monthsArray = [ "January", "February",  "March", "April", "May", "June", "July", "August", "September",  "October", "November", "December"];
      let fileName = '' ;
      let id : number;
      let lastEntry = list[list.length - 1];
  
      if(list[0].hasOwnProperty('date')) {
        const dateObj = lastEntry.date;
        const monthIndex = dateObj.getMonth();
        const monthString = monthsArray[+monthIndex];
        const yearString = dateObj.getFullYear();
        id = lastEntry.id;
        fileName = `Table-ID${id}-${monthString}${yearString}.json`;
      } 
      else {
        id = lastEntry.id;
        fileName = `AddressTable-ID${id}.json`;
      }
      
      const fileType = this.fileSaverService.genType(fileName);
      const text = JSON.stringify(list);
      const txtBlob = new Blob([text], { type: fileType });
      this.fileSaverService.save(txtBlob, fileName);
    } 
  
  }
    

} //class #################################################################################################################################################
// ########################################################################################################################################################
