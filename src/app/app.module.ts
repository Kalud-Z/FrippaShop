import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }        from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { TasksModule } from './tasks/tasks.module';
import { LoginModule } from './login/login.module';
import { BalanceComponent } from './balance/balance.component';
import { SharedModule } from './shared/shared.module';
import { BalanceTableStyleDirective } from './balance/directives/balance-table-style.directive';
import { DisplayInEuroPipe } from './balance/pipes/display-in-euro.pipe';
import { NewBalanceItemComponent } from './balance/new-balance-item/new-balance-item.component';
import { BalanceModule } from './balance/balance.module';
import { AddressBookComponent } from './address-book/address-book.component';
import { FilterByCountryPipe } from './address-book/pipes/filter-by-country.pipe';
import { FilterByCityPipe } from './address-book/pipes/filter-by-city.pipe';
import { NewAddressComponent } from './address-book/new-address/new-address.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransactionsComponent,
    AddressBookComponent,
    FilterByCountryPipe,
    FilterByCityPipe,
    NewAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TasksModule,
    LoginModule,
    SharedModule,
    BalanceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
