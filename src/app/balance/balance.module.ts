import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { NewBalanceItemComponent } from './new-balance-item/new-balance-item.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DisplayInEuroPipe } from './_pipes/display-in-euro.pipe';
import { BalanceTableStyleDirective } from './_directives/balance-table-style.directive';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../login/_guards/auth.guard';
import { NewTaskGuard } from '../tasks/new-task/new-task.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




const balanceRoutes: Routes = [ 

  {path:'' , component : BalanceComponent , canActivate : [AuthGuard]  , children : [
    { path : 'new-balanceItem' , component : NewBalanceItemComponent ,  canActivate : [NewTaskGuard]},
    { path : 'new-balanceItem/:id' , component : NewBalanceItemComponent , canActivate : [NewTaskGuard] }
  ] },

]


@NgModule({
  declarations: [
    BalanceComponent,
    NewBalanceItemComponent,
    DisplayInEuroPipe,
    BalanceTableStyleDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    // BrowserAnimationsModule,
    RouterModule.forChild(balanceRoutes)
  ]
})
export class BalanceModule { }
