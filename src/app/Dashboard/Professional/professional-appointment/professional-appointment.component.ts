// import { Component, OnInit, ViewChild } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MatCalendar } from '@angular/material/datepicker';
// import { Router } from '@angular/router';

// interface Booking {
//   bookingId: number;
//   customerId: number;
//   professionalId: number;
//   packageId: number;
//   serviceAppointmentDate: string;
//   serviceDoneDate: string | null;
//   status: string;
// }

// @Component({
//   selector: 'app-professional-appointment',
//   templateUrl: './professional-appointment.component.html',
//   styleUrls: ['./professional-appointment.component.css']
// })

// export class ProfessionalAppointmentComponent implements OnInit {
//   bookings: Booking[] = [];
//   selectedDate: Date | null = null;
//   @ViewChild('calendar') calendar!: MatCalendar<Date>;
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
//   pages: number[] = [];
//   totalPages: number = 0;

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     const token = localStorage.getItem('profToken');
//     if(!token){
//       alert('Please login to access the dashboard');
//       this.router.navigateByUrl('/login/professionalLogin');
//     }
//     this.fetchBookings();
//   }

//   fetchBookings(): void {
//     const token = localStorage.getItem('profToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http.get<{success: boolean, bookings?: Booking[], message?: string}>('https://localhost:7001/api/Professional/getBookings', { headers }).subscribe(
//       (response) => {
//         if(response.success){
//           this.bookings = response.bookings || [];
//           this.totalPages = Math.ceil(this.bookings.length / this.itemsPerPage);
//           this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
//           this.calendar.updateTodaysDate();
//           console.log(this.bookings);
//         }
//         else{
//           console.error(response.message);
//         }
//       },
//       (error) => {
//         console.error('Error fetching bookings:', error);
//       }
//     );
//   }

//   dateClass = (date: Date) => {
//     const dateString = date.toDateString();
//     const hasBooking = this.bookings.some(booking => new Date(booking.serviceAppointmentDate).toDateString() === dateString);
//     return hasBooking ? 'has-booking' : '';
//   }

//   getBookingsForDate(date: Date): Booking[] {
//     return this.bookings.filter(booking => new Date(booking.serviceAppointmentDate).toDateString() === date.toDateString());
//   }

//   getStatusClass(status: string): string {
//     switch (status) {
//       case 'Pending':
//         return 'table-warning';
//       case 'Accepted':
//         return 'table-primary';
//       case 'Completed':
//         return 'table-success';
//       case 'Cancelled':
//         return 'table-danger';
//       default:
//         return '';
//     }
//   }

//   sortTable(column: keyof Booking): void {
//     this.bookings.sort((a, b) => {
//       const aValue = a[column];
//       const bValue = b[column];

//       if (aValue === null || bValue === null) {
//         return 0;
//       }

//       if (aValue < bValue) return -1;
//       if (aValue > bValue) return 1;
//       return 0;
//     });
//   }

//   changePage(page: number): void {
//     if (page < 1 || page > this.totalPages) return;
//     this.currentPage = page;
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatCalendar } from '@angular/material/datepicker';
import { Router } from '@angular/router';

interface Booking {
  bookingId: number;
  customerId: number;
  professionalId: number;
  packageId: number;
  serviceAppointmentDate: string;
  serviceDoneDate: string | null;
  status: string;
}

@Component({
  selector: 'app-professional-appointment',
  templateUrl: './professional-appointment.component.html',
  styleUrls: ['./professional-appointment.component.css']
})
export class ProfessionalAppointmentComponent implements OnInit {
  bookings: Booking[] = [];
  selectedDate: Date | null = new Date(); 
  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  pages: number[] = [];
  totalPages: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('profToken');
    if (!token) {
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('/login/professionalLogin');
    } else {
      this.fetchBookings();
    }
  }

  fetchBookings(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{ success: boolean, bookings?: Booking[], message?: string }>('https://localhost:7001/api/Professional/getBookings', { headers }).subscribe(
      (response) => {
        if (response.success) {
          this.bookings = response.bookings || [];
          this.totalPages = Math.ceil(this.bookings.length / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.calendar.updateTodaysDate();
          console.log(this.bookings);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  dateClass = (date: Date) => {
    const dateString = date.toDateString();
    const hasBooking = this.bookings.some(booking => new Date(booking.serviceAppointmentDate).toDateString() === dateString);
    return hasBooking ? 'has-booking' : '';
  }

  getBookingsForDate(date: Date): Booking[] {
    return this.bookings.filter(booking => new Date(booking.serviceAppointmentDate).toDateString() === date.toDateString());
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'table-warning';
      case 'Accepted':
        return 'table-primary';
      case 'Completed':
        return 'table-success';
      case 'Cancelled':
        return 'table-danger';
      default:
        return '';
    }
  }

  sortTable(column: keyof Booking): void {
    this.bookings.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === null || bValue === null) {
        return 0;
      }

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}