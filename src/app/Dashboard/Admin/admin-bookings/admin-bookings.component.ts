// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface Booking {
//   bookingId: number;
//   customerId: number;
//   customer: any;
//   professionalId: number;
//   professional: any;
//   packageId: number;
//   package: any;
//   serviceAppointmentDate: string;
//   serviceDoneDate: string | null;
//   status: string;
// }

// @Component({
//   selector: 'app-admin-bookings',
//   templateUrl: './admin-bookings.component.html',
//   styleUrls: ['./admin-bookings.component.css']
// })
// export class AdminBookingsComponent implements OnInit {
//   bookings: Booking[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.http.get<Booking[]>('https://localhost:7001/api/Admin/getAllBookings')
//       .subscribe((data: Booking[]) => {
//         this.bookings = data;
//       }, error => {
//         console.error('There was an error fetching the bookings!', error);
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Booking {
  bookingId: number;
  customerId: number;
  customer: { customerName: string } | null;
  professionalId: number;
  professional: { professionalName: string } | null;
  packageId: number;
  package: { packageName: string } | null;
  serviceAppointmentDate: string;
  serviceDoneDate: string | null;
  status: string;
}

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Booking[]>('https://localhost:7001/api/Admin/getAllBookings')
      .subscribe((data: Booking[]) => {
        this.bookings = data;
      }, error => {
        console.error('There was an error fetching the bookings!', error);
      });
  }
}