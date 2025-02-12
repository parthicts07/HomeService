import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Customer {
  customerName: string;
}

interface Package {
  packageName: string;
}

interface Booking {
  bookingId: number;
  customerId: number;
  customer: Customer | null;
  professionalId: number;
  packageId: number;
  package: Package | null;
  serviceAppointmentDate: string;
  serviceDoneDate: string | null;
  status: string;
}

@Component({
  selector: 'app-professional-booking',
  templateUrl: './professional-booking.component.html',
  styleUrls: ['./professional-booking.component.css']
})

export class ProfessionalBookingComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('profToken');
    if(!token){
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('/login/professionalLogin');
    }
    this.fetchBookings();
  }

  fetchBookings(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{success: boolean, bookings?: Booking[], message?: string}>('https://localhost:7001/api/Professional/getBookings', { headers }).subscribe(
      (response) => {
        if (response.success){
          this.bookings = response.bookings || [];
        }
        else{
          console.error(response.message);
          alert(response.message);
        }
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  // updateBookingStatus(bookingId: number, status: string): void {
  //   const token = localStorage.getItem('profToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Professional/updateBookingStatus?bookingId=${bookingId}&status=${status}`, {}, { headers }).subscribe(
  //     (response) => {
  //       if(response.success){
  //         this.fetchBookings();
  //       }
  //     },
  //     (error) => {
  //       console.error('Error updating booking status:', error);
  //     }
  //   );
  // }

  updateBookingStatus(bookingId: number, status: string): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{ success: boolean, message?: string }>(`https://localhost:7001/api/Professional/updateBookingStatus?bookingId=${bookingId}&status=${status}`, {}, { headers }).subscribe(
      (response) => {
        if (response.success) {
          this.fetchBookings();
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: response.message || `Booking ${status.toLowerCase()} successfully.`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'Error updating booking status.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
      (error) => {
        console.error('Error updating booking status:', error);
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Error updating booking status. Please try again later.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    );
  }

  // updateServiceDoneDate(bookingId: number): void {
  //   const token = localStorage.getItem('profToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const serviceDoneDate = new Date().toISOString();
  //   const body = {
  //     bookingId,
  //     serviceDoneDate,
  //     status: 'Completed'
  //   };
  //   this.http.put('https://localhost:7001/api/Professional/updateServiceDoneDate', body, { headers }).subscribe(
  //     () => {
  //       this.fetchBookings();
  //     },
  //     (error) => {
  //       console.error('Error updating service done date:', error);
  //     }
  //   );
  // }

  updateServiceDoneDate(bookingId: number): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const serviceDoneDate = new Date().toISOString();
    const body = {
      bookingId,
      serviceDoneDate,
      status: 'Completed'
    };
    this.http.put<{ success: boolean, message?: string }>('https://localhost:7001/api/Professional/updateServiceDoneDate', body, { headers }).subscribe(
      (response) => {
        if (response.success) {
          this.fetchBookings();
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: response.message || 'Service done date updated successfully.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'Error updating service done date.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
      (error) => {
        console.error('Error updating service done date:', error);
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Error updating service done date. Please try again later.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    );
  }
}