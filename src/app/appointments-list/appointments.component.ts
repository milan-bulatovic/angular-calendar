import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Appointment,
  NewAppointmentComponent,
} from './new-appointment/new-appointment.component';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../shared/services/send-data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  receivedData: Appointment[] = [];

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.data$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Appointment) => {
        this.receivedData.push(data);
      });
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    moveItemInArray(this.receivedData, event.previousIndex, event.currentIndex);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewAppointmentComponent, {
      width: '30%',
      height: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onDeleteAppointment(index: number) {
    const deletedDate = new Date(this.receivedData[index].date);

    this.receivedData.splice(index, 1); // Remove the appointment at the specified index
    this.dataService.deleteAppointment(deletedDate);

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
