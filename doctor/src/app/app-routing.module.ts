import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookingComponent} from "./booking/booking.component";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookings',
    pathMatch: 'full'
  }, {
    path: 'bookings',
    component: BookingComponent
  }, {
    path: 'bookings/:bookingId',
    component: BookingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
