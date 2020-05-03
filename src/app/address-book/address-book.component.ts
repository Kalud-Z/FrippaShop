import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';
import { Address } from './address.model';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressCrudService } from './services/address-crud.service';
import { DataStorageService } from '../tasks/services/data-storage.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit { //#####################################################################################################
  addressList : Address[];


  currentUser : string;
  adminName : string;
  showFilterCrl : boolean;
  countries : string[];
  cities    : string[];


  // countries : string[] = ['ghana' , 'France'];
  // cities    : string[] = ['Paris' , 'berlin'];

  filterByCountryInput: string[] = [];
  filterByCityInput: string[] = [];


  

  // ########################################################################################################

  constructor(private addressCrudService : AddressCrudService,
              private authService : AuthService,
              private router : Router,
              private route : ActivatedRoute,
              private ds : DataStorageService
              ) { }

  ngOnInit(): void {
    this.addressList = this.addressCrudService.getAddressList();
    this.countries = this.buildCountriesArray();
    this.cities = this.buildCitiesArray();
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
      this.router.navigate(['new-balanceItem'] , { relativeTo :  this.route } );
    }
  }


  onModifyAddress(id : number) {
    if(this.currentUser === this.adminName ) {
      this.router.navigate(['new-balanceItem/' + id ] , { relativeTo :  this.route } );
    }
  }


  
  resetAllFilters() {
    this.filterByCountryInput = [];
    this.filterByCityInput = [];
  }
  


  storeData() {
    console.log('in storeeee')
    this.ds.storeAddressList(this.addressCrudService.addressList).subscribe( data => {
      console.log(data)
    })
  }




}  // class #################################################################################################################################################






