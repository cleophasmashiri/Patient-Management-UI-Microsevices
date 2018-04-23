import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {BookingService} from "./booking.service";
import {AppRoutingModule} from "./app-routing.module";
import { BookingComponent } from './booking/booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';


@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    BookingDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
