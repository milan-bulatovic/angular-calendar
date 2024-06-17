import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Appointment,
  EditAppointment,
} from 'src/app/shared/models/appointment.model';
import { DataService } from 'src/app/shared/services/send-data.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  form!: FormGroup;
  editData: EditAppointment;
  edit: boolean;

  constructor(
    private _fb: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dialogRef: MatDialogRef<NewAppointmentComponent>
  ) {
    this.editData = this.data;
    this.editData ? (this.edit = true) : (this.edit = false);
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      date: [this.editData?.appointment?.date || '', [Validators.required]],
      note: [this.editData?.appointment?.note || '', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    } else {
      const appointment: Appointment = this.form.value as Appointment;
      this.dataService.sendData(appointment);
      this.dialogRef.close();
    }
  }

  onUpdate(): void {
    if (!this.form.valid) {
      return;
    } else {
      const appointment: Appointment = {
        date: this.form.value.date,
        note: this.form.value.note,
      };
      this.dataService.editAppointment(appointment, this.editData.index);
      this.dialogRef.close();
    }
  }
}
