import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../shared/shared.module';
import { FilterByAlreadySentPipe } from './pipes/filter-by-already-sent.pipe';
import { RouterModule, Routes } from '@angular/router';
import { TableStyleDirective } from './directives/table-style.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileSaverModule } from 'ngx-filesaver';
import { AuthGuard } from '../login/auth.guard';
import { NewTaskGuard } from './new-task/new-task.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalaryComponent } from './salary/salary.component';
import { ScrollToTopComponent } from '../shared/scroll-to-top/scroll-to-top.component';



const tasksRoutes: Routes = [ 

  {path:'' , component: TasksComponent , canActivate : [AuthGuard] , children : [
    { path: 'new-task' , component : NewTaskComponent , canActivate : [NewTaskGuard] },
    { path: 'new-task/:id' , component : NewTaskComponent , canActivate : [NewTaskGuard] }
  ]},

]

@NgModule({
  declarations: [
    NewTaskComponent,
    TasksComponent,
    FilterByAlreadySentPipe,
    TableStyleDirective,
    SalaryComponent,
    ScrollToTopComponent
   ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(tasksRoutes),
    FormsModule,
    HttpClientModule,
    FileSaverModule,

    // BrowserAnimationsModule
  ]
})


export class TasksModule { }
