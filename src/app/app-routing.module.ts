import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { TasksModule } from './tasks/tasks.module';
import { LoadAfterDelayService } from './load-after-delay.service';
import { LoginModule } from './login/login.module';
import { BalanceComponent } from './balance/balance.component';

LoginModule

const AppRoutes: Routes = [ 
  
  // {path:'login' , component : LoginComponent},
  {path:'login' ,  data: { preload: true, loadAfter: 3000 },
  loadChildren : () => import('./login/login.module').then(m => m.LoginModule) },
  

  {path:'tasks' ,  data: { preload: true, loadAfter: 6000 },
  loadChildren : () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  

  {path:'transactions' , component : TransactionsComponent , canActivate : [AuthGuard] },

  {path:'balance' , component : BalanceComponent , canActivate : [AuthGuard] }

  // {path:'' , redirectTo : '/tasks' , pathMatch : 'full'}

]


@NgModule({
  imports: [ RouterModule.forRoot(AppRoutes , { preloadingStrategy : LoadAfterDelayService })],
  exports : [RouterModule]
})

export class AppRoutingModule { }


