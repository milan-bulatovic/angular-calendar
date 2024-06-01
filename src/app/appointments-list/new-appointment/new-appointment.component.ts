import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/send-data.service';

export interface Appointment {
  date: string;
  note: string;
}

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  form!: FormGroup;

  constructor(private _fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      date: ['', [Validators.required]],
      note: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    } else {
      const appointment: Appointment = this.form.value as Appointment;
      this.dataService.sendData(appointment);
    }
  }
}
