import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDatePipe } from './filter-date.pipe';
import { FilterByMonthPipe } from './filter-by-month.pipe';
import { FilterByYearPipe } from './filter-by-year.pipe';
import { FilterByTypePipe } from './filter-by-type.pipe';
import { LoadingSpinnerLoginComponent } from './loading-spinner-login/loading-spinner-login.component';
import { ClickOutsideDirective } from './click-outside.directive';
// import { TheadBorderDirective } from './thead-border.directive';
import { ScrollTopBottomDirective } from './scroll-top-bottom.directive';



@NgModule({
  declarations: [
    FilterDatePipe,
    FilterByMonthPipe,
    FilterByYearPipe,
    FilterByTypePipe,
    LoadingSpinnerLoginComponent,
    ClickOutsideDirective,
    ScrollTopBottomDirective,
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
  
  ]
})


export class SharedModule { }
