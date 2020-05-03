import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Address } from '../address.model';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit { //############################################################################################
  name : string;
  city: string;
  country: string;
  postalCode : number;
  street : string;
  houseNr : number;
  phone : number;


  modifyAddressView: boolean;
  currentID : number;
  currentAddress : Address;
  popupView = false;
  

  constructor(private route : ActivatedRoute,
              private router : Router
              ) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   if (params["id"]) {
    //     this.modifyAddressView = true;
    //     this.currentID = +params["id"];
    //     this.currentBalanceItem = this.balanceCrudService.getBalanceItem(this.currentID);
    //     this.spent = this.currentBalanceItem.spent;
    //     this.received = this.currentBalanceItem.received;
    //     this.details = this.currentBalanceItem.details;
    //     console.log('this is spent ' , this.spent)
    //     console.log('this is spent . type ' ,typeof this.spent)
       
    //   }  
    // }) //subscribe()
  }


  onSubmit(saveForm) {
    const spent = saveForm.form.value.spent;
    const received = saveForm.form.value.received;
    const details = saveForm.form.value.details;

    const spentFinal    =  spent === undefined ? 0 : spent;
    const receivedFinal =  received === undefined ? 0 : received;

    // if(this.modifyAddressView) {
    //   this.balanceCrudService.updateBalanceItem(this.currentID ,spentFinal , receivedFinal , details);
    //   this.modifyAddressView = false;
    //   this.router.navigate(['../../'] , { relativeTo :  this.route });
    // }

    // else {
    //   this.balanceCrudService.addBalanceItem(spentFinal , receivedFinal , details);
    //   this.router.navigate(['../'] , { relativeTo :  this.route });
    // }
  } //onSubmit()

  
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
    if(this.modifyAddressView) {
      this.router.navigate(['../../'] , { relativeTo :  this.route });
    } else {

      this.router.navigate(['../'] , { relativeTo :  this.route } );
    }

  }
  onPopupNo() {
    this.popupView = false;
  }












} // class #############################################################################################################################################



