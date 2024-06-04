import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.data$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        this.allAppointments.push(data);
        console.log(this.allAppointments);
      },
      error: (error) => {
        console.error('Error updating appointment:', error);
      },
    });

    this.dataService.editAppointment$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          if (data && data.appointment && data.index !== undefined) {
            const updatedAppointment = data.appointment;
            const appointmentIndex = data.index;

            this.allAppointments.splice(
              appointmentIndex,
              1,
              updatedAppointment
            );
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Error updating appointment:', error);
        },
      });
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

  onDeleteAppointment(index: number) {
    const deletedDate = new Date(this.allAppointments[index].date);
    this.allAppointments.splice(index, 1);
    this.dataService.deleteAppointment(deletedDate);
    this.cdr.detectChanges();
  }

  onEditAppointment(event: { appointment: any; index: number; date: string }) {
    const { appointment, index, date } = event;
    this.dataService.editAppointment(appointment, index, date);
    this.allAppointments[index] = appointment;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
