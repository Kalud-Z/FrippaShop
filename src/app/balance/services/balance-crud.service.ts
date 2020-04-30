import { Injectable } from '@angular/core';
import { BalanceItem } from '../balanceItem.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { DataStorageService } from 'src/app/tasks/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})

// #######################################################################################################################################################
export class BalanceCrudService { //######################################################################################################################
  balanceItemsList: BalanceItem[] = [];

  balanceItemSubject = new BehaviorSubject<BalanceItem[]>(null);

  constructor(private dataStorageService: DataStorageService) { }

  private BalanceItemsListUpdatedNotify()  {
    this.balanceItemSubject.next(this.balanceItemsList.slice());
    console.log('this is the list' , this.balanceItemsList);
  }



  getBalanceItemsList() {
    if(this.balanceItemsList.length === 0) {
      const localStorageData = JSON.parse(localStorage.getItem('balanceItemsList'));
      if(localStorageData && localStorageData.length !== 0) { this.pushToList(localStorageData) }
      else {
          this.dataStorageService.fetchBalanceItemsList().subscribe(data => {
          this.pushToList(data);
          localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));
          this.BalanceItemsListUpdatedNotify();

        })
      }
    }
  }



  adjustIDs() {
    this.balanceItemsList.forEach( (el,index) => {
      el.id = index+1;
    })
    this.BalanceItemsListUpdatedNotify();
  } 



  createNewBalanceItem(spent : number , received : number , left: number , details : string , id?: number , date? : Date) {
      let correctID : number;
      if(id)  { correctID = id }
      else    { correctID = this.balanceItemsList[this.balanceItemsList.length - 1].id + 1 }
      const balanceItem = new BalanceItem(spent, received ,left , details , id , date);
      return balanceItem;
  }


  
  createNewItemAndPush(spent : number , received : number , left: number , details : string , id?: number , date? : Date, state?: string) {
    let correctDate : Date;
    if(!date) { correctDate = new Date() }
    else { correctDate = date }

    const balanceItem = this.createNewBalanceItem(spent, received , left , details , id , correctDate);
    this.balanceItemsList.push(balanceItem);
    this.BalanceItemsListUpdatedNotify();

    if(state !== 'initial') {
      this.dataStorageService.storeBalanceItemsList(this.balanceItemsList);
    }
  }



  private pushToList (data: BalanceItem[]) {
    // console.log('retuend data fom server ' , data)

    data.forEach((el, index ) => {

    // console.log('robject returned :  ' , el)

      const id = el.id;
      const left = el.left;
      const spent = el.spent;
      const received     = el.received;
      const details     = el.details;

      if(index === 4) {
        console.log('id ' , el.id );
        console.log('left ' , el.left );
        console.log('received ' , el.received );
        console.log('details ' , el.details );
      }
  
      // const dateStr = el.date.substr(0 ,10);   // 2019-11-01
      // const dateStrArray = dateStr.split('-');

      // const year = parseInt(dateStrArray[0]) 
      // const month = parseInt(dateStrArray[1]) 
      // const day = parseInt(dateStrArray[2]) 

      // var dateObj : Date = new Date();
      // dateObj.setFullYear(year, month-1, day);

      // //we create Task items and push them to the array.
      // // console.log('this is the id' , id)
      // this.createNewItemAndPush(spent , received , left , details , id , dateObj);
    })

  }







}  //class ##############################################################################################################################################



