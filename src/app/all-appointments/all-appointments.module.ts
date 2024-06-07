import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllAppointmentsComponent } from './all-appointments.component';
import { ChildRouteModule } from './child-route-folder/child-route.module';

const routes: Routes = [
  { path: '', component: AllAppointmentsComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('./child-route-folder/child-route.module').then(
        (m) => m.ChildRouteModule
      ),
  },
];

@NgModule({
  declarations: [AllAppointmentsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ChildRouteModule],
  exports: [AllAppointmentsComponent],
})
export class AllAppointmentsModule {}
