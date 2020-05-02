import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { crudService } from './services/crud.service';
import { Task } from './task.model';
import { DataStorageService } from './services/data-storage.service';
import { FileSaverService } from 'ngx-filesaver';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

// ###########################################################################################################################################################
export class TasksComponent implements OnInit  { //###########################################################################################################
  tasks: Task[];

  previousDate : string= '';
  @ViewChild('logoCell')  logoCell: ElementRef;
  tableMarginOffset : string;

  currentUser : string;
  adminName : string;

  monthsArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  yearsArray = [ 2018 , 2019 , 2020 , 2021];
  typesArray =  ['transaction'  ,   'shoes' ,  'watch' , 'other' , 'shipment'];

  inFilterMode = false;

  filterByYearInput: number;
  filterByMonthInput: string[] = [];
  filterByTypeInput: string[] = [];
  filterByAlreadySent : boolean;

  showFilterCrl : boolean = false;



  constructor(private authService : AuthService,
              private crudService : crudService,
              private dataStorageService: DataStorageService,
              private router : Router,
              private route : ActivatedRoute
              ) { }


  ngOnInit(): void {
    this.crudService.tasksListChangedSubject.subscribe(data => { this.tasks = data })
    this.crudService.getTasksList();
    this.currentUser = this.authService.currentUserName;
    this.adminName = environment.khaledName;
  } //ngOnInit()

  ngDoCheck() {
    if(this.filterByMonthInput.length === 0) { this.inFilterMode = false } 
    else { this.inFilterMode = true  }
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

  setYear(year: number) {
    this.filterByYearInput = year;
  }
  
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

  resetAllFilters() {
    this.filterByYearInput = 0;
    this.filterByMonthInput = [];
    this.filterByTypeInput = [];
    this.filterByAlreadySent = undefined
  }

  onAddNewTask() {
    if(this.currentUser === this.adminName ) {
      console.log('we are now going to new task')
      this.router.navigate(['new-task'] , { relativeTo :  this.route } );
    }
  }

  onModifyTask(id : number) {
    if(this.currentUser === this.adminName ) {
      this.router.navigate(['new-task/' + id ] , { relativeTo :  this.route } );
    }
  }



  displayDateRow(i:number) {
    if(this.inFilterMode) {
      return false;
    }
    else {
      if(i < this.tasks.length-1) {
        if(this.tasks[i].date.getMonth() !==  this.tasks[i+1].date.getMonth()) { return true } else { return false }
      } 
      else { return false }
    }
    
  } //displayDateRow()




// converting data from excel  ###############################################################################################################################################


fixData() {
  this.crudService.fixingListDates();
}


adjustUI() {
  let markup = `<svg class="checklogo" style="height: 1.5rem; width: 1.5rem;">  <use xlink:href="/assets/symbol-defs.svg#icon-checkmark"></use> </svg> `;
  const allCell = document.getElementsByTagName('td');

  Array.from(allCell).forEach(el => {
    if(el.innerText === 'check') {
      el.innerText = '';
      el.insertAdjacentHTML('afterbegin', markup);
    }
  })
  
} //adjustUI()

onStore() {
  this.dataStorageService.storeTasksList(this.crudService.tasksList);
}

extraction() {
  const allRows = document.querySelectorAll('.ff  tr');

  //looping through all rows
  allRows.forEach( (el,index) => {
    const allCells = el.children;
    var type: string;
    var alreadySent : boolean = false;
    var detail : string;
    var id: number;
    var date : Date = new Date();
    date.setFullYear(2020,2,1);  


    
    //looping through all cells
    Array.from(allCells).forEach((td,index) => {
      var checkMarkIndex : number;
      var x = td.textContent; 
      console.log('this is thecell content : ' , x);

      // if (x == String.fromCharCode(160)) { x = ''}
      if(x == '✓')  { 
        checkMarkIndex = index;
        // console.log('yeswe ave cehckmark in this index : ' , index)
      };

      switch(checkMarkIndex) {
        case 1 : {  type = 'transaction' ; break; } 
        case 2 : {  type = 'shoes' ; break; } 
        case 3 : {  type = 'watch' ; break; } 
        case 4 : {  type = 'other' ; break; } 
        case 5 : {  type = 'shipment' ; break; } 
        case 8 : {  alreadySent = true ; break; } 
      }

      if(index === 7) { detail = x }
      if(index === 0) { id = +x }

      
    }) //end of inner loop



    this.crudService.createNewTaskAndPush(type , alreadySent , detail , id , date);

  }) //end of first loop


} //extraction()






}  //class #################################################################################################################################################
// ####################################################################################################################################################




