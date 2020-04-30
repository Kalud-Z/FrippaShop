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


const AppRoutes: Routes = [ 

  {path:'**' , component: TasksComponent , canActivate : [AuthGuard] , children : [
    { path: 'new-task' , component : NewTaskComponent , canActivate : [NewTaskGuard] },
    { path: 'new-task/:id' , component : NewTaskComponent , canActivate : [NewTaskGuard] }
  ]},

]

@NgModule({
  declarations: [
    NewTaskComponent,
    TasksComponent,
    FilterByAlreadySentPipe,
    TableStyleDirective
   ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AppRoutes),
    FormsModule,
    HttpClientModule,
    FileSaverModule,
  ]
})


export class TasksModule { }
