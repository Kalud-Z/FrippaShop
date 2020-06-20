import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Address } from '../address.model';
import { SynchUIService } from 'src/app/_services/synch-ui.service';
import { AddressCrudService } from '../_services/address-crud.service';
import { createNewTrigger, popupWindowTrigger } from 'src/app/shared/_animations/animations';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss'],
  animations : [
    createNewTrigger,
    popupWindowTrigger
  ]
})

// #####################################################################################################################################################
export class NewAddressComponent implements OnInit { //################################################################################################
  @HostBinding('@createNewState') routeAnimation = true;

  name : string 
  city: string 
  phone : string 
  country: string 
  street : string 
  postalCode : number
  houseNr : number

  currentID : number;
  currentAddress : Address;

  modifyEntryView: boolean;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private addressCrudService : AddressCrudService,
              private synchUIService : SynchUIService
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params["id"]) {
        this.weAreInModifyEntryView();
        this.modifyEntryView = this.synchUIService.modifyEntryView;

        this.currentID = +params["id"];
        this.currentAddress = this.addressCrudService.getAddress(this.currentID);
        this.name = this.currentAddress.name;
        this.city = this.currentAddress.city;
        this.country = this.currentAddress.country;
        this.postalCode = this.currentAddress.postalCode;
        this.houseNr = this.currentAddress.houseNr;
        this.phone = this.currentAddress.phone;
        this.street = this.currentAddress.street;
      }  
      else { this.weAreNotInModifyEntryView() }
    }) //subscribe()
  }  //ngOnInit


  onSubmit(saveForm) {
    if(this.synchUIService.modifyEntryView) {
      console.log('we are in modify')
      this.addressCrudService.updateAddress(this.currentID , this.name , this.city , this.country , this.postalCode , this.street , this.houseNr , this.phone)
      this.router.navigate(['../../'] , { relativeTo :  this.route });
    }
    else {
      this.addressCrudService.addAddress(this.name , this.city , this.country , this.postalCode , this.street , this.houseNr , this.phone);
      this.router.navigate(['../'] , { relativeTo :  this.route });
    }
  } //onSubmit()

  
  onExitEntryView(event) {
    if (
      event.target.className === "container" ||
      event.target.nodeName === "svg" ||
      event.target.nodeName === "use" ||
      event.target.localName === "app-new-address"
    ) {
        this.showPopupView();
    }
  }


  onDeleteTask() { this.addressCrudService.deleteAddress(this.currentID) }

  
  // #####################################################       PRIVATE       #############################################################################

  private weAreNotInModifyEntryView() {
    this.synchUIService.modifyEntryView = false;
  }

  private weAreInModifyEntryView() {
    this.synchUIService.modifyEntryView = true;
  }

  private showPopupView() {
    this.synchUIService.showPopupView$.next(true);
  }



} // class #############################################################################################################################################
// ####################################################################################################################################################


