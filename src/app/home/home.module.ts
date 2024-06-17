import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AppointmentsModule } from './appointments-list/appointments.module';
import { CalendarModule } from '../shared/components/calendar/calendar.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./appointments-list/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CalendarModule,
    AppointmentsModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
