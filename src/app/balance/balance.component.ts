import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';

import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


import { DataStorageService } from '../shared/_services/data-storage.service';
import { AuthService } from '../login/_services/auth.service';
import { BalanceCrudService } from './_services/balance-crud.service';
import { BalanceItem } from './balanceItem.model';
import { routeSlideStateTrigger } from '../shared/_animations/animations';
import { SynchUIService } from '../_services/synch-ui.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  animations : [
    routeSlideStateTrigger
  ]
})

// #######################################################################################################################################################
export class BalanceComponent implements OnInit , OnDestroy { //########################################################################################################
  @HostBinding('@routeSlideState') routeAnimation = true;
  balanceItemsList: BalanceItem[];

  currentUser : string;
  adminName : string;

  clickInsideHeader = false;

  inFilterMode = false;
  showFilterCrl : boolean;
  monthsArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  yearsArray = [ 2018 , 2019 , 2020 , 2021];
  filterByMonthInput: string[] = [];
  filterByYearInput: number;

  destroy$ = new Subject<boolean>();

  constructor(private balanceCrudService: BalanceCrudService,
              private dt: DataStorageService,
              private authService : AuthService,
              private router : Router,
              private route : ActivatedRoute,
              private synchUIService : SynchUIService
              ) { }

  ngOnInit(): void {
    this.balanceCrudService.balanceItem$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.balanceItemsList = data 
      this.synchUIService.isComponentLoading$.next(false);
    })
    this.synchUIService.clickInsideHeader$.pipe(takeUntil(this.destroy$)).subscribe(data =>  this.clickInsideHeader = data )
    this.synchUIService.onAddNewRow$.pipe(takeUntil(this.destroy$)).subscribe(() =>  this.onAddBalanceItem() )
    this.synchUIService.showFilter$.pipe(takeUntil(this.destroy$)).subscribe(() => this.showFilter() )
    this.balanceCrudService.getBalanceItemsList();
    this.currentUser = this.authService.currentUserName;
    this.adminName = environment.khaledName;
  } //ngOninit


   ngDoCheck() {
    if(this.filterByMonthInput.length === 0) { this.inFilterMode = false } 
    else { this.inFilterMode = true  }
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  onAddBalanceItem() {
    if(this.currentUser === this.adminName && this.clickInsideHeader ) {
      this.router.navigate(['new-balanceItem'] , { relativeTo :  this.route } );
    }
  }


  onModifyBalanceItem(id : number) {
    if(this.currentUser === this.adminName ) {
      setTimeout(() => {
        this.router.navigate(['new-balanceItem/' + id ] , { relativeTo :  this.route } );
      }, 10);
    }
  }


  
  displayDateRow(i : number , items : BalanceItem[]) {
    if(i < (items.length - 1)) { 
       if(items[i].date.getMonth() !==  items[i+1].date.getMonth()) { return true } else { return false }
    }
    else { return false }
  }




// ##############################################          filter Methods         ##########################################################################

  private showFilter() {
    if(this.clickInsideHeader) {
      this.showFilterCrl = true
    }
  }

 
  resetAllFilters() {
    this.filterByYearInput = 0;
    this.filterByMonthInput = [];
  }

  
  addOrRemoveMonth(month : string) {
    let indexOfTarget =  this.filterByMonthInput.indexOf(month);
    if(indexOfTarget === -1) {
      this.filterByMonthInput = [...this.filterByMonthInput , month];
    } else {
      this.filterByMonthInput.splice(indexOfTarget , 1);
      this.filterByMonthInput = [...this.filterByMonthInput];
    }
  }

  
  setYear(year: number) {  this.filterByYearInput = year }



}  //  class  ########################################################################################################################################################
// ###########################################################################################################################################################

