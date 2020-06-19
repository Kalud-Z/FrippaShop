import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDatePipe } from './_pipes/filter-date.pipe';
import { FilterByMonthPipe } from './_pipes/filter-by-month.pipe';
import { FilterByYearPipe } from './_pipes/filter-by-year.pipe';
import { FilterByTypePipe } from './_pipes/filter-by-type.pipe';
import { LoadingSpinnerLoginComponent } from './loading-spinner-login/loading-spinner-login.component';
import { ClickOutsideDirective } from './_directives/click-outside.directive';
// import { TheadBorderDirective } from './thead-border.directive';
import { ScrollTopBottomDirective } from './_directives/scroll-top-bottom.directive';
import { HeaderComponent } from './header/header.component';
import { AreYouSureYouWannaExitComponent } from './are-you-sure-you-wanna-exit/are-you-sure-you-wanna-exit.component';



@NgModule({
  declarations: [
    FilterDatePipe,
    FilterByMonthPipe,
    FilterByYearPipe,
    FilterByTypePipe,
    LoadingSpinnerLoginComponent,
    ClickOutsideDirective,
    ScrollTopBottomDirective,
    HeaderComponent,
    AreYouSureYouWannaExitComponent,
  ],
  imports: [
    CommonModule
  ],
  exports : [
    FilterDatePipe,
    FilterByMonthPipe,
    FilterByYearPipe,
    FilterByTypePipe,
    LoadingSpinnerLoginComponent,
    ClickOutsideDirective,
    ScrollTopBottomDirective,
    HeaderComponent,
    AreYouSureYouWannaExitComponent,
  ]
})


export class SharedModule { }
