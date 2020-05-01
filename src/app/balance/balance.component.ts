import { Component, OnInit } from '@angular/core';
import { BalanceItem } from './balanceItem.model';
import { BalanceCrudService } from './services/balance-crud.service';
import { DataStorageService } from '../tasks/services/data-storage.service';
import { AuthService } from '../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})

// #######################################################################################################################################################
export class BalanceComponent implements OnInit { //########################################################################################################
  balanceItemsList: BalanceItem[];
  currentUser : string;
  adminName : string;

  inFilterMode = false;
  showFilterCrl : boolean;

  monthsArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  yearsArray = [ 2018 , 2019 , 2020 , 2021];

  filterByMonthInput: string;
  filterByYearInput: number;


  constructor(private balanceCrudService: BalanceCrudService,
              private dt: DataStorageService,
              private authService : AuthService,
              private router : Router,
              private route : ActivatedRoute
              ) { }

  ngOnInit(): void {
    // this.authService.autoLogin();

    this.balanceCrudService.getBalanceItemsList();
    this.balanceCrudService.balanceItemSubject.subscribe(data => { this.balanceItemsList = data })
    this.currentUser = this.authService.currentUserName;
    this.adminName = environment.khaledName;
  } //ngOninit


   ngDoCheck() {
    if(this.filterByMonthInput === '' || !this.filterByMonthInput) {
      this.inFilterMode = false;
    } else {
      this.inFilterMode = true;
    }
  }



  onAddBalanceItem() {
    if(this.currentUser === this.adminName ) {
      this.router.navigate(['new-balanceItem'] , { relativeTo :  this.route } );
    }
  }

  onModifyBalanceItem(id : number) {
    if(this.currentUser === this.adminName ) {
      this.router.navigate(['new-balanceItem/' + id ] , { relativeTo :  this.route } );
    }
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

  onModifyTask(id : number) {
    if(this.currentUser === this.adminName ) {
      this.router.navigate(['new-balanceItem/' + id] , { relativeTo :  this.route } );
    }
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
    var monthArrayShort = [];
    this.monthsArray.map(el => { monthArrayShort.push(el.substr(0, 3)) })

    var arrayOfData = str.split('-');
    var day = +arrayOfData[0]
    var year = +arrayOfData[2]
    var month = arrayOfData[1]

    var monthIndex = monthArrayShort.indexOf(month);

    var finalDate = new Date();
    finalDate.setFullYear(year, monthIndex, day)

    return finalDate;
  }



  resetAllFilters() {
    this.filterByYearInput = 0;
    this.filterByMonthInput = '';
  }

  
  setMonth(data : string) {
    this.filterByMonthInput = data;
  }

  
  setYear(year: number) {
    this.filterByYearInput = year;
  }



}  //########################################################################################################################################################

