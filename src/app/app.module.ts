import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { TasksModule } from './tasks/tasks.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { BalanceModule } from './balance/balance.module';
import { AddressModule } from './address-book/address.module';
import { UnderConstructionComponent } from './transactions/under-construction/under-construction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransactionsComponent,
    UnderConstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    TasksModule,
    BalanceModule,
    AddressModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
