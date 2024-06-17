import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { CalendarModule } from './home/calendar/calendar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppointmentsModule } from './home/appointments-list/appointments.module';
import { HomeModule } from './home/home.module';
import { AllAppointmentsModule } from './all-appointments/all-appointments.module';
import { NavigationModule } from './shared/components/navigation/navigation.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CalendarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppointmentsModule,
    HomeModule,
    AllAppointmentsModule,
    NavigationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
