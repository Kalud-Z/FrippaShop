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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransactionsComponent,
    BalanceComponent,
    BalanceTableStyleDirective,
    DisplayInEuroPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TasksModule,
    LoginModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
