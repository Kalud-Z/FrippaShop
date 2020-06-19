import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';

import { SynchUIService } from '../_services/synch-ui.service';
import { AuthService } from '../login/_services/auth.service';
import { DataStorageService } from '../shared/_services/data-storage.service';
import { AddressCrudService } from './_services/address-crud.service';
import { Address } from './address.model';
import { routeSlideStateTrigger } from '../shared/_animations/animations';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
  animations : [
    routeSlideStateTrigger
  ]
})

// ##########################################################################################################################################################
export class AddressBookComponent implements OnInit { //#####################################################################################################
  @HostBinding('@routeSlideState') routeAnimation = true;
  
  addressList : Address[] = [];
  currentUser : string;
  adminName : string;
  countries : string[] = []
  cities    : string[] = []
  
  filterByCountryInput: string[] = [];
  filterByCityInput:    string[] = [];
  
  clickInsideHeader = false;
  showFilterCrl : boolean;

  constructor(private addressCrudService : AddressCrudService,
              private authService : AuthService,
              private router : Router,
              private route : ActivatedRoute,
              private ds : DataStorageService,
              private synchUIService : SynchUIService
              ) { }


  ngOnInit(): void {
    this.addressCrudService.addressSubject.subscribe(data => { 
      this.addressList = data;
      this.synchUIService.isComponentLoadingSubject.next(false);
      if(data !== null) {
        this.countries = this.buildCountriesArray();
        this.cities    = this.buildCitiesArray();
      }
    })
    this.synchUIService.clickInsideHeaderSubject.subscribe(data =>  this.clickInsideHeader = data )
    this.synchUIService.onAddNewRowSubject.subscribe(() =>  this.onAddAddress() )
    this.synchUIService.showFilterSubject.subscribe(() => this.showFilter() )

    this.addressCrudService.getAddressList();
    this.currentUser = this.authService.currentUserName;
    this.adminName = environment.khaledName;
  }

  
  addOrRemoveCountry(country : string) {
    let indexOfTarget =  this.filterByCountryInput.indexOf(country);
    if(indexOfTarget === -1) { this.filterByCountryInput = [...this.filterByCountryInput , country] }
    else {
      this.filterByCountryInput.splice(indexOfTarget , 1);
      this.filterByCountryInput = [...this.filterByCountryInput];
    }
  }

  
  addOrRemoveCity(city : string) {
    let indexOfTarget =  this.filterByCityInput.indexOf(city);
    if(indexOfTarget === -1) { this.filterByCityInput = [...this.filterByCityInput , city] }
    else {
      this.filterByCityInput.splice(indexOfTarget , 1);
      this.filterByCityInput = [...this.filterByCityInput];
    }
  }


  onAddAddress() {
    if(this.currentUser === this.adminName && this.clickInsideHeader) {
      this.router.navigate(['new-address'] , { relativeTo :  this.route } );
    }
  }


  onModifyAddress(id : number) {
    if(this.currentUser === this.adminName ) {
      setTimeout(() => {
        this.router.navigate(['new-address/' + id ] , { relativeTo :  this.route } );
      }, 20);
    }
  }
  

  resetAllFilters() {
    this.filterByCountryInput = [];
    this.filterByCityInput = [];
  }
  


  // #######################################################    PRIVATE   #####################################################################################
  private buildCountriesArray () {
    // console.log(' we are in builcoutry ,  this is the list : ' , this.addressList)
    let finalArray : string[] = [];
    this.addressList.forEach(el => {
      if(finalArray.indexOf(el.country) === -1) {
        finalArray.push(el.country);
      }
    })

    return finalArray;
  }


  private buildCitiesArray () {
    let finalArray : string[] = [];
    
    this.addressList.forEach(el => {
      if(finalArray.indexOf(el.city) === -1) {
        finalArray.push(el.city);
      }
    })

    return finalArray;
  }


  private showFilter() {
    if(this.clickInsideHeader) {
      this.showFilterCrl = true
    }
  }




}  //####################################################################################################################################################  
// class #################################################################################################################################################
