import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {BookingService} from "./../booking.service";
import {Booking} from "./../booking";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  public booking: Booking;
  private error: any;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) {}

  ngOnInit() {
    let bookingId: string = this.route.snapshot.paramMap.get('bookingId');
    console.log('bookingId: ' +bookingId);
    this.bookingService.getBookingById(bookingId)
      .subscribe(booking => {
          this.booking = booking;
          console.log(this.booking);
        },
      err => this.error = err);
  }

}
