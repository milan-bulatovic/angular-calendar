import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../new-appointment/new-appointment.component';

@Component({
  selector: 'app-appointment-single',
  templateUrl: './appointment-single.component.html',
  styleUrls: ['./appointment-single.component.scss'],
})
export class AppointmentSingleComponent {
  @Input() data!: Appointment;
  @Output() deleteAppointment = new EventEmitter<void>();

  onDeleteAppointment() {
    this.deleteAppointment.emit();
  }
}
