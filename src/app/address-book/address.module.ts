import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { FilterByCountryPipe } from './pipes/filter-by-country.pipe';
import { FilterByCityPipe } from './pipes/filter-by-city.pipe';




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
    RouterModule.forChild(addressRoutes)
  ]
})
export class AddressModule { }
