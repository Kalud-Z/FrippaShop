import { Component, OnInit,  } from '@angular/core';
import { BalanceCrudService } from '../services/balance-crud.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BalanceItem } from '../balanceItem.model';


@Component({
  selector: 'app-new-balance-item',
  templateUrl: './new-balance-item.component.html',
  styleUrls: ['./new-balance-item.component.scss']
})
export class NewBalanceItemComponent implements OnInit { //#########################################################################################
  // @ViewChild('saveForm' , {static : true}) newBalanceItemForm; 
  // @ViewChild('saveForm' , {static : false}) NgForm newBalanceItemForm; 
  // @ViewChild('heroForm') NgForm heroForm;

  popupView: boolean;
  currentID : number;
  modifyTaskView: boolean;
  currentBalanceItem : BalanceItem;

  spent : number;
  received: number;
  details : string;
  

  constructor(private balanceCrudService : BalanceCrudService,
              private router : Router,
              private route : ActivatedRoute
            ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      if (params["id"]) {
        this.modifyTaskView = true;
        this.currentID = +params["id"];
        this.currentBalanceItem = this.balanceCrudService.getBalanceItem(this.currentID);
        this.spent = this.currentBalanceItem.spent;
        this.received = this.currentBalanceItem.received;
        this.details = this.currentBalanceItem.details;
        console.log('this is spent ' , this.spent)
        console.log('this is spent . type ' ,typeof this.spent)
       
      }  
    }) //subscribe()
  } //ngonint();
  

  onSubmit(saveForm) {
    const spent = saveForm.form.value.spent;
    const received = saveForm.form.value.received;
    const details = saveForm.form.value.details;

    const spentFinal    =  spent === undefined ? 0 : spent;
    const receivedFinal =  received === undefined ? 0 : received;

    if(this.modifyTaskView) {
      this.balanceCrudService.updateBalanceItem(this.currentID ,spentFinal , receivedFinal , details);
      this.modifyTaskView = false;
      this.router.navigate(['../../'] , { relativeTo :  this.route });
    }

    else {
      this.balanceCrudService.addBalanceItem(spentFinal , receivedFinal , details);
      this.router.navigate(['../'] , { relativeTo :  this.route });
    }
  } //onSubmit()


  onDeleteTask() {
    this.balanceCrudService.deleteBalanceItem(this.currentID);
  }


  // exit popup stuff ################################################################################################

  ExitPopup(event) {
    if (
      event.target.className === "container" ||
      event.target.nodeName === "svg" ||
      event.target.nodeName === "use"
    ) {
      this.popupView = true;
    }
  }

  onPopupYes() {
    // this.router.navigate(["../"] , );
    if(this.modifyTaskView) {
      this.router.navigate(['../../'] , { relativeTo :  this.route });
    } else {

      this.router.navigate(['../'] , { relativeTo :  this.route } );
    }

  }
  onPopupNo() {
    this.popupView = false;
  }




}  // class ##########################################################################################################################################
