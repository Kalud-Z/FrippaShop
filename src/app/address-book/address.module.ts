import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AddressBookComponent } from './address-book.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { FilterByCountryPipe } from './_pipes/filter-by-country.pipe';
import { FilterByCityPipe } from './_pipes/filter-by-city.pipe';
import { SharedModule } from '../shared/shared.module';



const addressRoutes: Routes = [ 
  
  {path:'' , component : AddressBookComponent , children : [
    { path : 'new-address' , component : NewAddressComponent },
    { path : 'new-address/:id' , component : NewAddressComponent }
  ] }
]


@NgModule({
  declarations: [
    AddressBookComponent,
    FilterByCountryPipe,
    FilterByCityPipe,
    NewAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(addressRoutes),
    SharedModule
  ]
})
export class AddressModule { }
