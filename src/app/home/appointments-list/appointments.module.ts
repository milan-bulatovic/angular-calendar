import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAppointmentComponent } from './add-new-appointment/new-appointment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from '../calendar/calendar.module';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentSingleModule } from 'src/app/shared/components/appointment-single/appointment-single.module';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
  },
];

@NgModule({
  declarations: [AppointmentsComponent, NewAppointmentComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    DragDropModule,
    CalendarModule,
    RouterModule.forChild(routes),
    AppointmentSingleModule,
  ],
  exports: [AppointmentsComponent, NewAppointmentComponent],
})
export class AppointmentsModule {}
