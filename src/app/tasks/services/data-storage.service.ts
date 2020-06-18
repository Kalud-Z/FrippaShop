import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../task.model";
import { FileSaverService } from "ngx-filesaver";
import { AuthService } from 'src/app/login/auth.service';
import { take , exhaustMap } from "rxjs/operators";
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


  // ##################################################################################################################################################


  storeBalanceItemsList(list: BalanceItem[]) {
      return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
        return this.http.put("https://frippashop.firebaseio.com/BalanceItemsList.json?auth=" + userData.token , list)
      })) 
        // this.downloadTable(list);
  }


  fetchBalanceItemsList() {
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.get<any[]>("https://frippashop.firebaseio.com/BalanceItemsList.json?auth=" + userData.token);
    }))
  }
 


  // ######################################################################################################################################################


  storeAddressList(list: Address[]) {
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.put("https://frippashop.firebaseio.com/AddressList.json?auth=" + userData.token , list)
    })) 
      // this.downloadTable(list);
}


  fetchAddressList() {
    return this.authService.userSubject.pipe(take(1) , exhaustMap(userData => {
      return this.http.get<any[]>("https://frippashop.firebaseio.com/AddressList.json?auth=" + userData.token);
    }))
  }






} //class #################################################################################################################################################
// ########################################################################################################################################################
