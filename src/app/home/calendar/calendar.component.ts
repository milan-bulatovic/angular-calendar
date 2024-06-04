import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
import { DataService } from '../../shared/services/send-data.service';
import { Subject, takeUntil } from 'rxjs';
import { Appointment } from '../../shared/models/appointment.model';

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
    this.dataService.data$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Appointment) => {
        const newDate = new Date(data.date);
        this.selectedDates.push(newDate);
        this.updateCalendar();
      });

    this.dataService.deleteAppointment$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deletedDate: Date) => {
        const index = this.selectedDates.findIndex(
          (date) => date.getTime() === deletedDate.getTime()
        );
        if (index !== -1) {
          this.selectedDates.splice(index, 1);
          this.updateCalendar();
        }
      });

    this.dataService.editAppointment$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        const oldDate = data?.date;
        const newDate = data?.appointment.date;

        if (data && newDate) {
          const updatedDate = new Date(newDate);
          this.selectedDates.push(updatedDate);

          const index = this.selectedDates.findIndex(
            (date) => date.getTime() === oldDate.getTime()
          );

          if (index !== -1) {
            this.selectedDates.splice(index, 1);
            this.updateCalendar();
          }

          this.updateCalendar();
        }
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
    this.calendar.updateTodaysDate();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
