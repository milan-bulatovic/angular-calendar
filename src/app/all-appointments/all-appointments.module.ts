import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllAppointmentsComponent } from './all-appointments.component';
import { AppointmentSingleModule } from '../shared/components/appointment-single/appointment-single.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppointmentDetailsModule } from './appointment-details/appointment-details.module';

const routes: Routes = [
  { path: '', component: AllAppointmentsComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('./appointment-details/appointment-details.module').then(
        (m) => m.AppointmentDetailsModule
      ),
  },
];

@NgModule({
  declarations: [AllAppointmentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppointmentSingleModule,
    AppointmentDetailsModule,
    DragDropModule,
  ],
  exports: [AllAppointmentsComponent],
})
export class AllAppointmentsModule {}
