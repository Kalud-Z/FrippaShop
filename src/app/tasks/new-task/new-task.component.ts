import { Component, OnInit, ViewChild } from '@angular/core';
import { crudService } from '../crud.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task } from '../task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})

// ############################################################################################################################################
export class NewTaskComponent implements OnInit { //###########################################################################################
  taskType: string;
  details: string;
  alreadySent: boolean;
  currentID : number;

  newTaskView: boolean;
  modifyTaskView: boolean;
  popupView: boolean;

  constructor(private crudService : crudService,
              private router : Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']) {
        this.modifyTaskView = true;
        this.currentID = +params['id'];
        let currentTask : Task = this.crudService.getTask(this.currentID);
        this.formInit(currentTask.type , currentTask.details , currentTask.isItemAlreadySent);
      }
    })

  } //ngOnInit()


  onAddTask() {
    if(this.modifyTaskView) { this.crudService.updateTask(this.currentID , this.taskType , this.alreadySent , this.details) }
    else { this.crudService.createNewTaskAndPush(this.taskType, this.alreadySent , this.details) }
    
    this.router.navigate(['../']); 
  }


  onDeleteTask() {
    this.crudService.deleteTask(this.currentID);
  }




  ExitPopup(event) {
    if(event.target.className === 'container' || event.target.nodeName === 'svg' || event.target.nodeName === 'use') { this.popupView = true }
  }

  onPopupYes() {this.router.navigate(['../']) }
  onPopupNo() { this.popupView = false }




  // ########################################  PRIVATE METHODS ###############################################################################


  
  private formInit(type: string, details: string , alreadySent : boolean) {
    this.taskType = type;
    this.details = details;
    this.alreadySent = alreadySent;
  }


  private hasNumber(myString) {
    return /\d/.test(myString);
  }


} //class ########################################################################################################################################
// ###############################################################################################################################################