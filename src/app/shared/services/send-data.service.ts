import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private appointmentsKey = 'appointments';

  private appointmentsSubject = new BehaviorSubject<Appointment[]>(
    this.getAppointmentsFromLocalStorage()
  );

  appointments$ = this.appointmentsSubject.asObservable();

  constructor() {}

  private getAppointmentsFromLocalStorage(): Appointment[] {
    const data = localStorage.getItem(this.appointmentsKey);
    return data ? JSON.parse(data) : [];
  }

  private saveAppointmentsToLocalStorage(appointments: Appointment[]): void {
    localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
    this.appointmentsSubject.next(appointments);
  }

  sendData(appointment: Appointment): void {
    const appointments = this.getAppointmentsFromLocalStorage();
    appointments.push(appointment);
    this.saveAppointmentsToLocalStorage(appointments);
  }

  editAppointment(updatedAppointment: Appointment, index: number): void {
    const appointments = this.getAppointmentsFromLocalStorage();
    appointments[index] = updatedAppointment;
    this.saveAppointmentsToLocalStorage(appointments);
  }

  deleteAppointment(appointmentToDelete: Appointment): void {
    const appointments = this.getAppointmentsFromLocalStorage();

    const normalizedDateToDelete = new Date(
      appointmentToDelete.date
    ).toISOString();

    const index = appointments.findIndex((app) => {
      const normalizedDate = new Date(app.date).toISOString();

      return (
        normalizedDate === normalizedDateToDelete &&
        app.note === appointmentToDelete.note
      );
    });

    if (index !== -1) {
      appointments.splice(index, 1);
      this.saveAppointmentsToLocalStorage(appointments);
    }
  }
}
