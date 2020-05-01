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
    // console.log('this is the list' , this.balanceItemsList);
  }

  addBalanceItem(spent: number , received : number , details : string) {
    let newLeft : number;
    const latestIndex = this.balanceItemsList.length-1;
    let lastestLeft = this.balanceItemsList[latestIndex].left;

    newLeft = lastestLeft - spent + received;
    this.createNewItemAndPush(spent , received , newLeft , details);
    this.dataStorageService.storeBalanceItemsList(this.balanceItemsList).subscribe(data => {
      localStorage.removeItem("balanceItemsList");
      localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));

    })
  }

  getBalanceItem(id : number): BalanceItem {
      let correctItem : BalanceItem;
      this.balanceItemsList.forEach(el => {
        if(el.id === id) correctItem = el;
      })
      return correctItem;
  }

  updateBalanceItem(id : number ,spent : number , received : number , details : string) {
    this.balanceItemsList.forEach( el => {
      if(el.id === id) {
        el.spent = spent;
        el.received = received;
        el.details = details;
      }
    })
    this.BalanceItemsListUpdatedNotify();
    this.dataStorageService.storeBalanceItemsList(this.balanceItemsList).subscribe( data => {
      localStorage.removeItem("balanceItemsList");
      localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));


    });
  }

  deleteBalanceItem(id : number) {
    this.balanceItemsList.forEach( (el, index) => {
      if(el.id === id) {
        if(el.id === id) { this.balanceItemsList.splice(index, 1) }
      }
    })
    this.BalanceItemsListUpdatedNotify();
    this.dataStorageService.storeBalanceItemsList(this.balanceItemsList).subscribe(data => {
      localStorage.removeItem("balanceItemsList");
      localStorage.setItem('balanceItemsList', JSON.stringify(this.balanceItemsList));
    });
  }



  getBalanceItemsList() {
    if(this.balanceItemsList.length === 0) {
      const localStorageData = JSON.parse(localStorage.getItem('balanceItemsList'));
      // const localStorageData = JSON.parse(localStorage.getItem('test2')); //sth is wrong with local storage. Im not using it for the moment.
      if(localStorageData && localStorageData.length === 0) { this.pushToList(localStorageData , 'fromLocalStorage'); console.log('we just loaded from localstorage') }
      else {
        console.log('we just loaded from API')
          this.dataStorageService.fetchBalanceItemsList().subscribe(data => {
          // console.log('this is data retuedn from API  firsssst' , data)
          this.pushToList(data , 'fromAPI');
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
    let correctId : number;
    if(!date) { correctDate = new Date() }
    else { correctDate = date }

    if(!id) {
      correctId = this.balanceItemsList[this.balanceItemsList.length - 1].id + 1;
    } else {
      correctId = id;
    }

    const balanceItem = this.createNewBalanceItem(spent, received , left , details , correctId , correctDate);
    this.balanceItemsList.push(balanceItem);
    this.BalanceItemsListUpdatedNotify();
  }



  private pushToList (data: any[] , type : string) {
    // console.log('retuend data fom server ' , data)

    data.forEach((el, index ) => {

      let id : number
      let left :number;
      let spent  : number;
      let received : number;
      let details : string;

    if(type === 'fromAPI') {
       id         = el.id;
       left       = el.left;
       spent      = el.spent;
       received   = el.received;
       details    = el.details;
    }
   

            
      // const id        = el.details;
      // const left      = el.received;
      // const spent     = el.id;
      // const received  = el.spent;
      // const details   = el.left;

      // if(index === 4) {
      //   console.log('id ' , id );
      //   console.log('left ' , left );
      //   console.log('received ' , received );
      //   console.log('details ' , details );
      //   console.log('spent ' , spent );
      // }
  
      const dateStr = el.date.substr(0 ,10);   // 2019-11-01
      const dateStrArray = dateStr.split('-');

      const year = parseInt(dateStrArray[0]) 
      const month = parseInt(dateStrArray[1]) 
      const day = parseInt(dateStrArray[2]) 

      var dateObj : Date = new Date();
      dateObj.setFullYear(year, month-1, day);

      this.createNewItemAndPush(spent , received , left , details , id , dateObj);
    })

  }







}  //class ##############################################################################################################################################



