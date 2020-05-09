import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Address } from '../address.model';
import { AddressCrudService } from '../services/address-crud.service';
import { createNewTrigger, popupWindowTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss'],
  animations : [
    createNewTrigger,
    popupWindowTrigger
  ]
})
export class NewAddressComponent implements OnInit { //############################################################################################
  name : string 
  city: string 
  phone : string 
  country: string 
  street : string 
  postalCode : number
  houseNr : number


  modifyAddressView: boolean;
  currentID : number;
  currentAddress : Address;
  popupView = false;

  @HostBinding('@createNewState') routeAnimation = true;

  

  constructor(private route : ActivatedRoute,
              private router : Router,
              private addressCrudService : AddressCrudService
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params["id"]) {
        this.modifyAddressView = true;
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
    }) //subscribe()
  }


  onSubmit(saveForm) {
    console.log(saveForm)

    if(this.modifyAddressView) {
      console.log('we are in modify')
      this.addressCrudService.updateAddress(this.currentID , this.name , this.city , this.country , this.postalCode , this.street , this.houseNr , this.phone)
      this.modifyAddressView = false;
      this.router.navigate(['../../'] , { relativeTo :  this.route });
    }

    else {
      console.log('we are in add')

      this.addressCrudService.addAddress(this.name , this.city , this.country , this.postalCode , this.street , this.houseNr , this.phone);
      this.router.navigate(['../'] , { relativeTo :  this.route });
    }
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



  onDeleteTask() {
    this.addressCrudService.deleteAddress(this.currentID)
  }











} // class #############################################################################################################################################



