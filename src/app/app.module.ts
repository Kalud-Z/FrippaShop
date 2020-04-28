import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { HttpClientModule }   from '@angular/common/http';



import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterDatePipe } from './tasks/pipes/filter-date.pipe';
import { AddMonthRowDirective } from './tasks/directives/add-month-row.directive';
import { TableStyleDirective } from './tasks/directives/table-style.directive';
import { TransactionsComponent } from './transactions/transactions.component';
import { FilterByMonthPipe } from './tasks/pipes/filter-by-month.pipe';
import { FilterByYearPipe } from './tasks/pipes/filter-by-year.pipe';
import { FilterByTypePipe } from './tasks/pipes/filter-by-type.pipe';
import { FilterByAlreadySentPipe } from './tasks/pipes/filter-by-already-sent.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    NavbarComponent,
    NewTaskComponent,
    FilterDatePipe,
    AddMonthRowDirective,
    TableStyleDirective,
    TransactionsComponent,
    FilterByMonthPipe,
    FilterByYearPipe,
    FilterByTypePipe,
    FilterByAlreadySentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
