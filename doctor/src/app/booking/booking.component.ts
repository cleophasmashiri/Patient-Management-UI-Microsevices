import { Component, OnInit } from '@angular/core';
import {BookingService} from "./../booking.service";
import {Booking} from "./../booking";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

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
