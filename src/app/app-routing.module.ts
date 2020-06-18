import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './login/_guards/auth.guard';
import { LoadAfterDelayService } from './_services/load-after-delay.service';


const AppRoutes: Routes = [ 
  
  {path:'login' ,  data: { preload: true, loadAfter: 3000 },
  loadChildren : () => import('./login/login.module').then(m => m.LoginModule) },
  

  {path:'tasks' ,  data: { preload: true, loadAfter: 6000 },
  loadChildren : () => import('./tasks/tasks.module').then(m => m.TasksModule) },

  
  {path:'balance' ,  data: { preload: true, loadAfter: 9000 },
  loadChildren : () => import('./balance/balance.module').then(m => m.BalanceModule) },
  

  {path:'transactions' , component : TransactionsComponent , canActivate : [AuthGuard] },

  
  {path:'address-book' ,  data: { preload: true, loadAfter: 12000 },
  loadChildren : () => import('./address-book/address.module').then(m => m.AddressModule) },
  

  {path:'' , redirectTo : '/tasks' , pathMatch : 'full'}

]


@NgModule({
  imports: [ RouterModule.forRoot(AppRoutes , { preloadingStrategy : LoadAfterDelayService })],
  // imports: [RouterModule.forRoot(AppRoutes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }


