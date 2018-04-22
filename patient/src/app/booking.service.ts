import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Booking} from "./booking";
import {Observable} from  'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookingService {

  constructor(private http: Http) {
  }

  getBookings(userId: string): Observable<Booking[]> {
    console.log(this.http.get('/assets/api/bookings.json'));
    return this.http.get('assets/api/bookings.json')
      .map(response => <Booking[]>response.json())
      //.do(data => console.log(data))
      .catch(error => Observable.throw(error));
  }

}
