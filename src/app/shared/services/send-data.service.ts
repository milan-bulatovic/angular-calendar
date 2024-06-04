import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Appointment, EditAppointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new Subject<Appointment>();
  data$ = this.dataSubject.asObservable();

  private deleteAppointmentSubject = new Subject<Date>();
  deleteAppointment$ = this.deleteAppointmentSubject.asObservable();

  private editAppointmentData = new BehaviorSubject<EditAppointment | null>(
    null
  );
  editAppointment$ = this.editAppointmentData.asObservable();

  sendData(data: Appointment) {
    this.dataSubject.next(data);
  }

  deleteAppointment(date: Date) {
    this.deleteAppointmentSubject.next(date);
  }

  editAppointment(appointment: any, index: number, date: string) {
    this.editAppointmentData.next({ appointment, index, date });
  }
}
