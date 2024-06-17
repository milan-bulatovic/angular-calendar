import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
import { DataService } from '../../services/send-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  selectedDates: Date[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.appointments$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((appointments) => {
        this.selectedDates = appointments.map(
          (appointment) => new Date(appointment.date)
        );
        this.updateCalendar();
      });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const isSelected = this.selectedDates.some(
        (d) =>
          d.getFullYear() === cellDate.getFullYear() &&
          d.getMonth() === cellDate.getMonth() &&
          d.getDate() === cellDate.getDate()
      );
      return isSelected ? 'selected-date' : '';
    }
    return '';
  };

  updateCalendar() {
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
