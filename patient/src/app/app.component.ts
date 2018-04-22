import { Component, OnInit } from '@angular/core';
import {BookingService} from "./booking.service";
import {Booking} from "./booking";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bookings';
  bookings: Booking[];

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    console.log('calling booking');
    this.bookingService.getBookings('100')
      .subscribe(bookings => {this.bookings = bookings},
        error => console.log(error));
  }
}
