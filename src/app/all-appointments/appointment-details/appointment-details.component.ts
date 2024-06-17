import { Component } from '@angular/core';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent {
  appointment: Appointment | undefined;

  constructor() {}

  ngOnInit(): void {
    const state = window.history.state;
    if (state && state.appointment) {
      this.appointment = state.appointment as Appointment;
    }
  }
}
