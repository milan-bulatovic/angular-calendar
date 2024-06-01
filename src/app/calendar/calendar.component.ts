import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
import { DataService } from '../shared/services/send-data.service';
import { Subject, takeUntil } from 'rxjs';
import { Appointment } from '../appointments-list/new-appointment/new-appointment.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  selectedDates: Date[] = [];
  private unsubscribe$ = new Subject<void>();
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

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
