import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewAppointmentComponent } from '../add-new-appointment/new-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/services/send-data.service';
import {
  Appointment,
  EditAppointment,
} from 'src/app/shared/models/appointment.model';

@Component({
  selector: 'app-appointment-single',
  templateUrl: './appointment-single.component.html',
  styleUrls: ['./appointment-single.component.scss'],
})
export class AppointmentSingleComponent {
  @Input() data!: Appointment;
  @Input() index!: number;
  @Input() date!: string;
  @Output() deleteAppointment = new EventEmitter<void>();
  @Output() editAppointment = new EventEmitter<EditAppointment>();

  constructor(public dialog: MatDialog) {}

  onDeleteAppointment() {
    this.deleteAppointment.emit();
  }

  onEditAppointment() {
    const appointmentData = {
      appointment: this.data,
      index: this.index,
      date: this.date,
    };
    this.editAppointment.emit(appointmentData);
    this.dialog.open(NewAppointmentComponent, {
      data: appointmentData,
      width: '30%',
      height: '50%',
    });
  }
}
