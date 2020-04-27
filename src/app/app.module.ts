import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { HttpClientModule }   from '@angular/common/http';



import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FilterDatePipe } from './tasks/filter-date.pipe';
import { AddMonthRowDirective } from './tasks/add-month-row.directive';
import { TableStyleDirective } from './tasks/table-style.directive';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    NavbarComponent,
    NewTaskComponent,
    FilterDatePipe,
    AddMonthRowDirective,
    TableStyleDirective
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
