import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDatePipe } from './filter-date.pipe';
import { FilterByMonthPipe } from './filter-by-month.pipe';
import { FilterByYearPipe } from './filter-by-year.pipe';
import { FilterByTypePipe } from './filter-by-type.pipe';



@NgModule({
  declarations: [
    FilterDatePipe,
    FilterByMonthPipe,
    FilterByYearPipe,
    FilterByTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports : [
    FilterDatePipe,
    FilterByMonthPipe,
    FilterByYearPipe,
    FilterByTypePipe
  ]
})


export class SharedModule { }
