import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildRouteComponent } from './child-route.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    component: ChildRouteComponent,
  },
];

@NgModule({
  declarations: [ChildRouteComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ChildRouteComponent],
})
export class ChildRouteModule {}
