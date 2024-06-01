import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { CalendarComponent } from './calendar.component';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe, // Choose one date module
  ],
  providers: [NativeDateAdapter],
  exports: [CalendarComponent],
})
export class CalendarModule {}
