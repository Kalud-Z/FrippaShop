import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../login/_services/auth.service';
import { Task } from './task.model';
import { tasksCrudService } from './_services/tasks-crud.service';
import { routeSlideStateTrigger } from '../shared/_animations/animations';
import { SynchUIService } from '../_services/synch-ui.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    routeSlideStateTrigger
  ]
})

// ###########################################################################################################################################################
export class TasksComponent implements OnInit , OnDestroy  { //################################################################################################
  @HostBinding('@routeSlideState') routeAnimation = true;

  tasks: Task[];

  clickInsideHeader = false;

  currentUser : string;
  adminName : string;

  monthsArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  yearsArray = [ 2018 , 2019 , 2020 , 2021];
  typesArray =  ['transaction'  ,   'shoes' ,  'watch' , 'other' , 'shipment'];

  filterByYearInput: number;
  filterByMonthInput: string[] = [];
  filterByTypeInput: string[] = [];
  filterByAlreadySent : boolean;
  showFilterCrl : boolean = false;
  inFilterMode = false;

  destroy$ = new Subject<boolean>();

  constructor(private authService : AuthService,
              private tasksCrudService : tasksCrudService,
              private router : Router,
              private route : ActivatedRoute,
              private synchUIService : SynchUIService
              ) { }


  ngOnInit(): void {
    this.tasksCrudService.tasksListChanged$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.tasks = data;
      this.synchUIService.isComponentLoading$.next(false);  // now , hopefully , template is fully rendered , so now we stop the loading spinner
    })
    this.synchUIService.clickInsideHeader$.pipe(takeUntil(this.destroy$)).subscribe(data =>  this.clickInsideHeader = data )
    this.synchUIService.onAddNewRow$.pipe(takeUntil(this.destroy$)).subscribe(() =>  this.onAddNewTask() )
    this.synchUIService.showFilter$.pipe(takeUntil(this.destroy$)).subscribe(() => this.showFilter() )

    this.tasksCrudService.getTasksList();
    this.currentUser = this.authService.currentUserName;
    this.adminName = environment.khaledName;
  } //ngOnInit()


  ngDoCheck() {
    if(this.filterByMonthInput.length === 0) { this.inFilterMode = false } 
    else { this.inFilterMode = true  }
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  // UI stuff  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  clickedOutsideHeader() { this.clickInsideHeader = false }

  mouseEnterHeader() {
    setTimeout(() => { this.clickInsideHeader = true }, 20);
  }

  mouseLeaveHeader() { this.clickedOutsideHeader() }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


  addOrRemoveMonth(month : string) {
    let indexOfTarget =  this.filterByMonthInput.indexOf(month);
    if(indexOfTarget === -1) { //adding a month
      this.filterByMonthInput = [...this.filterByMonthInput , month];
    } else {  // removing a month
      this.filterByMonthInput.splice(indexOfTarget , 1);
      this.filterByMonthInput = [...this.filterByMonthInput];  // I had to reassign it like this , otherwise the pipe wouldn't be triggered.
    }
  }

  setYear(year: number) { this.filterByYearInput = year }
  
  addOrRemoveType(type : string) {
    let indexOfTarget =  this.filterByTypeInput.indexOf(type);
    if(indexOfTarget === -1) {
      this.filterByTypeInput = [...this.filterByTypeInput , type];
    } else {
      this.filterByTypeInput.splice(indexOfTarget , 1);
      this.filterByTypeInput = [...this.filterByTypeInput];
    }
  }

  setAlreadySent(boolVar : boolean) {
    if(boolVar === true )  { this.filterByAlreadySent = true }
    if(boolVar === false ) { this.filterByAlreadySent = false }
  }

  showFilter() {
    if(this.clickInsideHeader) { this.showFilterCrl = true }
  }

  resetAllFilters() {
    this.filterByYearInput = 0;
    this.filterByMonthInput = [];
    this.filterByTypeInput = [];
    this.filterByAlreadySent = undefined
  }

  onAddNewTask() {
    if(this.currentUser === this.adminName && this.clickInsideHeader) {
      this.router.navigate(['new-task'] , { relativeTo :  this.route });
    }
  }


  onModifyTask(id : number) {
    if(this.currentUser === this.adminName ) {
      setTimeout(() => {
        this.router.navigate(['new-task/' + id ] , { relativeTo :  this.route } );
      }, 10);
    }
  }


  displayDateRow(i : number , tasks : Task[]) {
    if(i < (tasks.length - 1)) {
      if(tasks[i].date.getMonth() !==  tasks[i+1].date.getMonth()) { return true } else { return false }
    }
    else { return false }
  }



}  //class #################################################################################################################################################
// ####################################################################################################################################################




