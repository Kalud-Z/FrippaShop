import { Component, OnInit, HostBinding } from '@angular/core';
import { Address } from './address.model';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressCrudService } from './services/address-crud.service';
import { DataStorageService } from '../tasks/services/data-storage.service';
import { routeSlideStateTrigger } from '../shared/animations';
import { crudService } from '../tasks/services/crud.service';

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


  

  // ########################################################################################################

  constructor(private addressCrudService : AddressCrudService,
              private authService : AuthService,
              private router : Router,
              private route : ActivatedRoute,
              private ds : DataStorageService,
              private crudService : crudService
              ) { }

  ngOnInit(): void {
    this.addressCrudService.addressSubject.subscribe(data => { 
      this.addressList = data;
      this.crudService.isLoadingSubject.next(false);
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
    if(this.currentUser === this.adminName ) {
      this.router.navigate(['new-address'] , { relativeTo :  this.route } );
    }
  }


  onModifyAddress(id : number) {
    console.log('modify noww')
    if(this.currentUser === this.adminName ) {
      this.router.navigate(['new-address/' + id ] , { relativeTo :  this.route } );
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






