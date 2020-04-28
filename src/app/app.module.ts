import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { HttpClientModule }   from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AddMonthRowDirective } from './tasks/directives/add-month-row.directive';
import { TableStyleDirective } from './tasks/directives/table-style.directive';
import { TransactionsComponent } from './transactions/transactions.component';
import { FilterByAlreadySentPipe } from './tasks/pipes/filter-by-already-sent.pipe';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
