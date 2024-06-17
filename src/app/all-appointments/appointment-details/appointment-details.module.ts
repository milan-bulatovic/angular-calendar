import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentDetailsComponent } from './appointment-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: AppointmentDetailsComponent,
  },
];

@NgModule({
  declarations: [AppointmentDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AppointmentDetailsComponent],
})
export class AppointmentDetailsModule {}
