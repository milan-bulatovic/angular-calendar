export interface Appointment {
  date: string;
  note: string;
}

export interface EditAppointment {
  appointment: any;
  index: number;
  date: string;
}
