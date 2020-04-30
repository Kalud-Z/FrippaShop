import { Component, OnInit } from '@angular/core';
import { BalanceItem } from './balanceItem.model';
import { BalanceCrudService } from './services/balance-crud.service';
import { DataStorageService } from '../tasks/services/data-storage.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
// #######################################################################################################################################################
export class BalanceComponent implements OnInit { //########################################################################################################
  balanceItemsList: BalanceItem[];

  inFilterMode = false;

  constructor(private balanceCrudService: BalanceCrudService,
              private dt: DataStorageService
              ) { }

  ngOnInit(): void {
    this.balanceCrudService.getBalanceItemsList();
    this.balanceCrudService.balanceItemSubject.subscribe(data => {
      this.balanceItemsList = data;
    })
  }

  displayDateRow(i : number) {
    if(this.inFilterMode) {
      return false;
    }
    else {
      if(i < this.balanceItemsList.length-1) {
        if(this.balanceItemsList[i].date.getMonth() !==  this.balanceItemsList[i+1].date.getMonth()) { return true } else { return false }
      } 
      else { return false }
    }
    
  }

  onModifyTask() {

  }

  fixid() {
    this.balanceCrudService.adjustIDs();

  }
  store() {
    this.dt.storeBalanceItemsList(this.balanceCrudService.balanceItemsList);
  }


  turnToFloat(str: string) {
    var newStr = str.replace(/,/g, ".");
    var finalNumber = parseFloat(newStr);
    return finalNumber;
  }


  extraction() {

    console.log('we are in extraction hhhhhhhh');
    const allRows = document.querySelectorAll('.tt  tr');

    console.log(allRows);

    allRows.forEach((el, index) => {
      const allCells = el.children;
      var left: number = 0;
      var received: number = 0;
      var spent: number = 0;
      var details: string;
      var date: Date;

      //looping through all cells
      Array.from(allCells).forEach((td, index) => {

        var x = td.textContent;

        if (index === 1) {
          if (x !== '') {
            spent = this.turnToFloat(x);
            spent = !spent ? 0 : spent;
          }
        }

        if (index === 2) {
          if (x !== '') {
            received = this.turnToFloat(x);
            received = !received ? 0 : received;
          }
        }


        if (index === 3) {
          if (x !== '') {
            left = this.turnToFloat(x);
            left = !left ? 0 : left;
          }
        }


        if (index === 4) { details = x }

        if (index === 0) {
          date =  this.setDate(x);
        }


      }) //end of inner loop

    
      // var obj = new BalanceItem(1, spent, received ,left , details ,date);
      // this.balanceCrudService.createNewItemAndPush(spent , received , left , details, date);

    }) //end of first loop


  } //extraction() ####


  setDate(str: string) {
    var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthArrayShort = [];
    monthsArray.map(el => { monthArrayShort.push(el.substr(0, 3)) })

    var arrayOfData = str.split('-');
    var day = +arrayOfData[0]
    var year = +arrayOfData[2]
    var month = arrayOfData[1]

    var monthIndex = monthArrayShort.indexOf(month);

    var finalDate = new Date();
    finalDate.setFullYear(year, monthIndex, day)

    return finalDate;
  }






}  //########################################################################################################################################################


