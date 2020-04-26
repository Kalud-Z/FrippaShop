import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';



const AppRoutes: Routes = [ 

  {path:'tasks' , component: TasksComponent , children : [
    { path: 'new-task' , component : NewTaskComponent },
    { path: 'new-task/:id' , component : NewTaskComponent }
  ]},
 
  {path:'' , redirectTo : '/tasks' , pathMatch : 'full'}

]


@NgModule({
  imports: [ RouterModule.forRoot(AppRoutes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }
