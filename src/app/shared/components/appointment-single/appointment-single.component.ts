import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewAppointmentComponent } from '../../../home/appointments-list/add-new-appointment/new-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
  selector: 'app-appointment-single',
  templateUrl: './appointment-single.component.html',
  styleUrls: ['./appointment-single.component.scss'],
})
export class AppointmentSingleComponent {
  @Input() data!: Appointment;
  @Input() index!: number;
  @Input() date!: string;
  @Input() allAppointmentsPage!: boolean;
  @Output() deleteAppointment = new EventEmitter<number>();
  @Output() viewAppointmentDetails = new EventEmitter<Appointment>();

  constructor(public dialog: MatDialog) {}

  onDeleteAppointment() {
    this.deleteAppointment.emit(this.index);
  }

  onEditAppointment() {
    const appointmentData = {
      appointment: this.data,
      index: this.index,
      date: this.date,
    };

    this.dialog.open(NewAppointmentComponent, {
      data: appointmentData,
      width: '30%',
      height: '50%',
    });
  }

  onViewAppointmentDetails() {
    this.viewAppointmentDetails.emit(this.data);
  }
}
