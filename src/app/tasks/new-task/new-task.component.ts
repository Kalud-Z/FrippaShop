import { Component, OnInit, HostBinding } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { tasksCrudService } from "../_services/tasks-crud.service";
import { Task } from "../task.model";
import { AuthService } from 'src/app/login/_services/auth.service';
import { createNewTrigger, popupWindowTrigger } from 'src/app/shared/_animations/animations';
import { SynchUIService } from 'src/app/_services/synch-ui.service';


@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"],
  animations : [
    createNewTrigger,
    popupWindowTrigger
  ]
})


// ###################################################################################################################################################
export class NewTaskComponent implements OnInit {  //###################################################################################################
  @HostBinding('@createNewState') routeAnimation = true;

  taskType: string;
  details: string;
  alreadySent: boolean;
  currentID: number;

  modifyEntryView: boolean;
  formValid: boolean = false;


  constructor(
    private authService: AuthService,
    private tasksCrudService: tasksCrudService,
    private router: Router,
    private route: ActivatedRoute,
    private synchUIService : SynchUIService
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params["id"]) {
        this.weAreInModifyEntryView();
        this.modifyEntryView = this.synchUIService.modifyEntryView;

        this.currentID = +params["id"];
        let currentTask: Task = this.tasksCrudService.getTask(this.currentID);
        this.formInit( currentTask.type, currentTask.details, currentTask.isItemAlreadySent);
      } else {
        this.alreadySent = false; //start condition
        this.weAreNotInModifyEntryView();
      }
    });
  } //ngOnInit()



  ngDoCheck() {
    if (!this.taskType || !this.details || this.alreadySent === undefined) { this.formValid = false }
    else { this.formValid = true }
  }



  onAddTask() {
    if (this.authService.currentUserName === 'khaled') {
      if (this.formValid) {
        if(this.synchUIService.modifyEntryView) { this.tasksCrudService.updateTask(this.currentID, this.taskType, this.alreadySent, this.details) }
        else { this.tasksCrudService.createNewTaskAndPush(this.taskType, this.alreadySent, this.details , null , null , 'store') }
        this.router.navigate(["../"]);
      }
    }
  }
  


  onDeleteTask() {
    if (this.authService.currentUserName === 'khaled') {
      this.tasksCrudService.deleteTask(this.currentID);
      this.router.navigate(["../../"]);
    }
  }

  

  onExitEntryView(event) {
    console.log('we closing');
    if(
      event.target.className === "container" ||
      event.target.nodeName === "svg" ||
      event.target.nodeName === "use" ||
      event.target.localName === 'app-new-task'
    ) {
      this.showPopupView();
    }
  }

  


  // ########################################  PRIVATE METHODS ###############################################################################

  private formInit(type: string, details: string, alreadySent: boolean) {
    this.taskType = type;
    this.details = details;
    this.alreadySent = alreadySent;
  }


  private weAreNotInModifyEntryView() {
    this.synchUIService.modifyEntryView = false;
  }

  private weAreInModifyEntryView() {
    this.synchUIService.modifyEntryView = true;
  }

  private showPopupView() {
    this.synchUIService.showPopupView$.next(true);
  }




} //class ########################################################################################################################################
// ###############################################################################################################################################
