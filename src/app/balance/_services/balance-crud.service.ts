import { Injectable } from '@angular/core';
import { BalanceItem } from '../balanceItem.model';
import { Subject } from 'rxjs';
import { DataStorageService } from 'src/app/shared/_services/data-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// #######################################################################################################################################################
export class BalanceCrudService { //######################################################################################################################
  balanceItemsList: BalanceItem[] = [];
  sentDataToTBalanceNow = false;
  balanceItem$ = new Subject<BalanceItem[]>();

  constructor(private dataStorageService: DataStorageService) { }


  addBalanceItem(spent: number , received : number , details : string) {
    let newMoneyLeft : number;
    const latestIndex = this.balanceItemsList.length-1;
    let lastestMoneyLeft = this.balanceItemsList[latestIndex].left;

    newMoneyLeft = lastestMoneyLeft - spent + received;
    this.createNewItemAndPush(spent , received , newMoneyLeft , details);
    this.dataStorageService.storeBalanceItemsList(this.balanceItemsList).subscribe(() => {
      localStorage.removeItem("balanceItemsList");
      localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));
    })
  }

  updateBalanceItem(id : number ,spent : number , received : number , details : string) {
    let correctIndex : number;
    this.balanceItemsList.forEach( (el, index) => {
      if(el.id === id) {
        el.spent = spent;
        el.received = received;
        el.details = details;
        correctIndex = index;
      }
    })

    for(var i = correctIndex ; i < this.balanceItemsList.length ; i++) {
      this.balanceItemsList[i].left = this.balanceItemsList[i-1].left + this.balanceItemsList[i].received - this.balanceItemsList[i].spent;  
    }

    this.BalanceItemsListUpdatedNotify();
    this.dataStorageService.storeBalanceItemsList(this.balanceItemsList).subscribe( () => {
      localStorage.removeItem("balanceItemsList");
      localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));
    });
  }


  deleteBalanceItem(id : number) {
    this.balanceItemsList.forEach( (el, index) => {
      if(el.id === id) { if(el.id === id) { this.balanceItemsList.splice(index, 1) } }
    })
    this.BalanceItemsListUpdatedNotify();
    this.dataStorageService.storeBalanceItemsList(this.balanceItemsList).subscribe(() => {
      localStorage.removeItem("balanceItemsList");
      localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));
    });
  }



  getBalanceItemsList() {
    if(this.balanceItemsList.length === 0 && environment.useLocalStorage) { // memory still empty . we fetch from localStorage (if we are allowed)
      const localStorageData = JSON.parse(localStorage.getItem('balanceItemsList'));
      if(localStorageData && localStorageData.length !== 0) {  this.pushToList(localStorageData) }
    }

    if(this.balanceItemsList.length > 0) {console.log('we just fetched from Memory') ;  this.BalanceItemsListUpdatedNotify() }
    else {  // fetch stuff from dataBase
        this.dataStorageService.fetchBalanceItemsList().subscribe(data => {
          this.pushToList(data);
          localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));
      })
    }

  }//getBalanceItemsList

  
  getBalanceItem(id : number): BalanceItem {
    let correctItem : BalanceItem;
    this.balanceItemsList.forEach(el => { if(el.id === id) correctItem = el  })
    return correctItem;
  }



  createNewBalanceItem(spent : number , received : number , left: number , details : string , id?: number , date? : Date) {
      let correctID : number;
      if(id)  { correctID = id }
      else    { correctID = this.balanceItemsList[this.balanceItemsList.length - 1].id + 1 }
      const balanceItem = new BalanceItem(spent, received ,left , details , id , date);
      return balanceItem;
  }


   createNewItemAndPush(spent : number , received : number , left: number , details : string , id?: number , date? : Date) {
    let correctDate : Date;
    let correctId : number;
    if(!date) { correctDate = new Date() }
    else { correctDate = date }

    if(!id) { correctId = this.balanceItemsList[this.balanceItemsList.length - 1].id + 1 }
    else    { correctId = id }

    const balanceItem = this.createNewBalanceItem(spent, received , left , details , correctId , correctDate);
    this.balanceItemsList.push(balanceItem);
    if(this.sentDataToTBalanceNow) { this.BalanceItemsListUpdatedNotify() }
  }


  // ####################################################################  PRIVATE ###################################################################

  private BalanceItemsListUpdatedNotify()  { this.balanceItem$.next(this.balanceItemsList.slice()) }


  private pushToList (data: any[]) {
    const arrayLength = data.length;
    data.forEach((el, index ) => {
      let id : number
      let left :number;
      let spent  : number;
      let received : number;
      let details : string;

      id         = el.id;
      left       = el.left;
      spent      = el.spent;
      received   = el.received;
      details    = el.details;
   
      const dateStr = el.date.substr(0 ,10);   // 2019-11-01
      const dateStrArray = dateStr.split('-');

      const year = parseInt(dateStrArray[0]) 
      const month = parseInt(dateStrArray[1]) 
      const day = parseInt(dateStrArray[2]) 

      var dateObj : Date = new Date();
      dateObj.setFullYear(year, month-1, day);

      if(index === arrayLength-1) { this.sentDataToTBalanceNow = true } 
      this.createNewItemAndPush(spent , received , left , details , id , dateObj);
    })
  }



}  //class ##############################################################################################################################################
// ##########################################################################################################################################################


