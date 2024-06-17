import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewAppointmentComponent } from './add-new-appointment/new-appointment.component';
import { Subject, takeUntil } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Appointment } from 'src/app/shared/models/appointment.model';
import { DataService } from 'src/app/shared/services/send-data.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  allAppointments: Appointment[] = [];

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.appointments$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((appointments) => {
        this.allAppointments = appointments;
      });
  }

  deleteAppointment(i: number) {
    this.dataService.deleteAppointment(i);
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    moveItemInArray(
      this.allAppointments,
      event.previousIndex,
      event.currentIndex
    );
  }

  openDialog(): void {
    this.dialog.open(NewAppointmentComponent, {
      width: '30%',
      height: '50%',
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
