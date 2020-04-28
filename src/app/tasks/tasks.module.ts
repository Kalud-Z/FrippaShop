import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../shared/shared.module';
import { FilterByAlreadySentPipe } from './pipes/filter-by-already-sent.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AddMonthRowDirective } from './directives/add-month-row.directive';
import { TableStyleDirective } from './directives/table-style.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileSaverModule } from 'ngx-filesaver';



@NgModule({
  declarations: [
    NewTaskComponent,
    TasksComponent,
    FilterByAlreadySentPipe,
    AddMonthRowDirective,
    TableStyleDirective
   ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FileSaverModule,
  ]
})


export class TasksModule { }
