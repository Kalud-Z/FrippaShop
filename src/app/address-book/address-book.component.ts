import { Component, OnInit, HostBinding } from '@angular/core';
import { Address } from './address.model';
import { AuthService } from '../login/_services/auth.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressCrudService } from './_services/address-crud.service';
import { DataStorageService } from '../shared/_services/data-storage.service';
import { routeSlideStateTrigger } from '../shared/_animations/animations';
import { tasksCrudService } from '../tasks/_services/tasks-crud.service';
import { SynchUIService } from '../_services/synch-ui.service';

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
  addressList : Address[] = [];

  currentUser : string;
  adminName : string;
  showFilterCrl : boolean;
  countries : string[] = []
  cities    : string[] = []

  @HostBinding('@routeSlideState') routeAnimation = true;

  filterByCountryInput: string[] = [];
  filterByCityInput:    string[] = [];

  clickInsideHeader = false;

  
  // ########################################################################################################

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
      console.log('we just got data back for address ts')
      if(data !== null) {
        this.countries = this.buildCountriesArray();
        this.cities    = this.buildCitiesArray();
      }
    })

    this.addressCrudService.getAddressList();
    
    this.currentUser = this.authService.currentUserName;
    this.adminName = environment.khaledName;

  }

  clickedOutsideHeader() {
    // console.log('clickedOutsideHeader is called')
    this.clickInsideHeader = false;
  }

  mouseEnterHeader() {
    // console.log('mouseEnterHeader is called')
    setTimeout(() => {
      this.clickInsideHeader = true;
    }, 20);
  }

  mouseLeaveHeader() {
    // console.log('mouseLEaverHeader is called')
    this.clickedOutsideHeader();
  }

  
  addOrRemoveCountry(country : string) {
    let indexOfTarget =  this.filterByCountryInput.indexOf(country);
    if(indexOfTarget === -1) {
      this.filterByCountryInput = [...this.filterByCountryInput , country];
    } else {
      this.filterByCountryInput.splice(indexOfTarget , 1);
      this.filterByCountryInput = [...this.filterByCountryInput];
    }
  }

  
  addOrRemoveCity(city : string) {
    let indexOfTarget =  this.filterByCityInput.indexOf(city);
    if(indexOfTarget === -1) {
      this.filterByCityInput = [...this.filterByCityInput , city];
    } else {
      this.filterByCityInput.splice(indexOfTarget , 1);
      this.filterByCityInput = [...this.filterByCityInput];
    }
  }




  buildCountriesArray () {
    // console.log(' we are in builcoutry ,  this is the list : ' , this.addressList)
    let finalArray : string[] = [];
    this.addressList.forEach(el => {
      if(finalArray.indexOf(el.country) === -1) {
        finalArray.push(el.country);
      }
    })

    return finalArray;
  }


  
  buildCitiesArray () {
    let finalArray : string[] = [];
    
    this.addressList.forEach(el => {
      if(finalArray.indexOf(el.city) === -1) {
        finalArray.push(el.city);
      }
    })

    return finalArray;
  }





  onAddAddress() {
    if(this.currentUser === this.adminName && this.clickInsideHeader) {
      this.router.navigate(['new-address'] , { relativeTo :  this.route } );
    }
  }


  onModifyAddress(id : number) {
    console.log('modify noww')
    if(this.currentUser === this.adminName ) {
      setTimeout(() => {
        this.router.navigate(['new-address/' + id ] , { relativeTo :  this.route } );
      }, 20);
    }
  }

  
  showFilter() {
    if(this.clickInsideHeader) {
      this.showFilterCrl = true
    }
  }
  

  resetAllFilters() {
    this.filterByCountryInput = [];
    this.filterByCityInput = [];
  }
  


  storeData() {
    // console.log('in storeeee')
    this.ds.storeAddressList(this.addressCrudService.addressList).subscribe( data => {
      console.log(data)
    })
  }




}  // class #################################################################################################################################################






