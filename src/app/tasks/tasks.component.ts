import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { crudService } from './crud.service';
import { Task } from './task.model';
import { DataStorageService } from './data-storage.service';
import { FileSaverService } from 'ngx-filesaver';

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

  constructor(private crudService : crudService,
              private dataStorageService: DataStorageService
              ) { }


  ngOnInit(): void {
    this.crudService.tasksListChangedSubject.subscribe(data => { this.tasks = data })
    this.dataStorageService.fetchTasksList();

  } //ngOnInit()


  
  fixData() {
    this.crudService.fixingListDates();
  }


  ngAfterViewInit()	 {
      // this.getWidthOfLogoCell(); 
  }

  ngAfterViewChecked() {
    // this.getWidthOfLogoCell(); 
  }

  getWidthOfLogoCell() {
    let width = this.logoCell.nativeElement.offsetWidth;
    this.tableMarginOffset = width.toString();
    console.log(this.tableMarginOffset);
    console.log(typeof this.tableMarginOffset);
    
    // return this.tableMarginOffset + 'px'
  }


  adjustUI() {
    // let markup = `<svg class="checklogo" style="height: 1.5rem; width: 1.5rem;">  <use xlink:href="/assets/symbol-defs.svg#icon-checkmark"></use> </svg> `;
    let markup = `<svg class="checklogo" style="height: 1.5rem; width: 1.5rem;">  <use xlink:href="/assets/symbol-defs.svg#icon-checkmark"></use> </svg> `;

    const allCell = document.getElementsByTagName('td');

    Array.from(allCell).forEach(el => {
      if(el.innerText === 'check') {
        el.innerText = '';
        el.insertAdjacentHTML('afterbegin', markup);
      }
    })
    
  } //adjustUI()

  storeData() {
    this.dataStorageService.storeTasksList();
  }

  fetchData() {
    this.dataStorageService.fetchTasksList();
  }



  displayDateRow(i:number) {
    // console.log('#########################################################')
    // console.log('thsi is i + 1' , this.tasks[i])
    // console.log('thsi is i' , this.tasks[i+1])
   if(i < this.tasks.length-1) {
      if(this.tasks[i].date.getMonth() !==  this.tasks[i+1].date.getMonth()) { return true } else { return false }
    } 
    else { return false } 
  }




// ###############################################################################################################################################
// ###############################################################################################################################################
// ###############################################################################################################################################
// ###############################################################################################################################################
// ###############################################################################################################################################




extraction() {
  // console.log('we are in extraction hhhhhhhh');
  const allRows = document.querySelectorAll('.tt tr');

  //looping through all rows
  allRows.forEach( (el,index) => {
    const allCells = el.children;
    var type: string;
    var alreadySent : boolean = false;
    var detail : string;
    var id: number;
    var date : Date = new Date();
    date.setFullYear(2020,0,1);


    
    //looping through all cells
    Array.from(allCells).forEach((td,index) => {
      var checkMarkIndex : number;
      var x = td.textContent; 

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























}  //class ####################################################################################################





