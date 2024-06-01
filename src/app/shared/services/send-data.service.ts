import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Appointment } from 'src/app/appointments-list/new-appointment/new-appointment.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new Subject<Appointment>();
  data$ = this.dataSubject.asObservable();

  private deleteAppointmentSubject = new Subject<Date>();
  deleteAppointment$ = this.deleteAppointmentSubject.asObservable();

  sendData(data: Appointment) {
    this.dataSubject.next(data);
  }

  deleteAppointment(date: Date) {
    this.deleteAppointmentSubject.next(date);
  }
}
