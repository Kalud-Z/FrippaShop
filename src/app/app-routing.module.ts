import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './login/auth.guard';
import { LoadAfterDelayService } from './load-after-delay.service';
import { LoginModule } from './login/login.module';
import { BalanceComponent } from './balance/balance.component';
import { NewBalanceItemComponent } from './balance/new-balance-item/new-balance-item.component';

LoginModule

const AppRoutes: Routes = [ 
  
  {path:'login' ,  data: { preload: true, loadAfter: 3000 },
  loadChildren : () => import('./login/login.module').then(m => m.LoginModule) },
  

  {path:'tasks' ,  data: { preload: true, loadAfter: 6000 },
  loadChildren : () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  

  {path:'transactions' , component : TransactionsComponent , canActivate : [AuthGuard] },

  {path:'balance' , component : BalanceComponent , canActivate : [AuthGuard]  , children : [
    // { path : '' , component : BalanceComponent },
    { path : 'new-balanceItem' , component : NewBalanceItemComponent },
    { path : 'new-balanceItem/:id' , component : NewBalanceItemComponent }
  ] },

  {path:'' , redirectTo : '/tasks' , pathMatch : 'full'}

]


@NgModule({
  imports: [ RouterModule.forRoot(AppRoutes , { preloadingStrategy : LoadAfterDelayService })],
  exports : [RouterModule]
})

export class AppRoutingModule { }


