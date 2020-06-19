import { Component, OnInit, HostBinding,  } from '@angular/core';
import { BalanceCrudService } from '../_services/balance-crud.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BalanceItem } from '../balanceItem.model';
import { createNewTrigger, popupWindowTrigger } from 'src/app/shared/_animations/animations';
import { SynchUIService } from 'src/app/_services/synch-ui.service';


@Component({
  selector: 'app-new-balance-item',
  templateUrl: './new-balance-item.component.html',
  styleUrls: ['./new-balance-item.component.scss'],
  animations : [
    createNewTrigger,
    popupWindowTrigger
  ]
})
export class NewBalanceItemComponent implements OnInit { //#########################################################################################
  @HostBinding('@createNewState') routeAnim = true;

  currentID : number;
  modifyEntryView: boolean;
  currentBalanceItem : BalanceItem;

  spent : number;
  received: number;
  details : string;


  constructor(private balanceCrudService : BalanceCrudService,
              private router : Router,
              private route : ActivatedRoute,
              private synchUIService : SynchUIService
            ) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params["id"]) {  //if we are in  modifyEntryView
        this.weAreInModifyEntryView();
        this.modifyEntryView = this.synchUIService.modifyEntryView;

        this.currentID = +params["id"];
        this.currentBalanceItem = this.balanceCrudService.getBalanceItem(this.currentID);
        this.spent = this.currentBalanceItem.spent;
        this.received = this.currentBalanceItem.received;
        this.details = this.currentBalanceItem.details;
      }  else {  //if we are NOT in  modifyEntryView
        this.weAreNotInModifyEntryView();
      }
    }) //subscribe()
  } //ngonint();
  
  

  onSubmit(saveForm) {
    const spent = saveForm.form.value.spent;
    const received = saveForm.form.value.received;
    const details = saveForm.form.value.details;

    const spentFinal    =  spent === undefined ? 0 : spent;
    const receivedFinal =  received === undefined ? 0 : received;

    if(this.synchUIService.modifyEntryView) {
      this.balanceCrudService.updateBalanceItem(this.currentID ,spentFinal , receivedFinal , details);
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


  onExitEntryView(event) {
    if (
      event.target.className === "container" ||
      event.target.nodeName === "svg" ||
      event.target.nodeName === "use" ||
      event.target.localName === 'app-new-balance-item'
    ) {
      this.showPopupView();
    }
  }


  // #####################################################       PRIVATE       #############################################################################

  private weAreNotInModifyEntryView() {
    this.synchUIService.modifyEntryView = false;
  }

  private weAreInModifyEntryView() {
    this.synchUIService.modifyEntryView = true;
  }

  private showPopupView() {
    this.synchUIService.showPopupViewSubject.next(true);
  }




}  // class ##########################################################################################################################################
