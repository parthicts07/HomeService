import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface Booking {
  bookingId: number;
  professional: {
    professionalName: string;
  };
  package: {
    packageId: number;
    packageName: string;
    price: number;
  };
  serviceAppointmentDate: string;
  serviceDoneDate: string | null;
  status: string;
}

@Component({
  selector: 'app-customer-bookings',
  templateUrl: './customer-bookings.component.html',
  styleUrls: ['./customer-bookings.component.css']
})
export class CustomerBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  rescheduleForm: FormGroup;
  ratingForm: FormGroup;
  paymentForm: FormGroup;
  selectedBookingId: number | null = null;
  showPaymentModal: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.rescheduleForm = this.fb.group({
      newDate: ['', []]
    });

    this.ratingForm = this.fb.group({
      ratingValue: ['', []],
      comment: ['', []]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', []],
      transactionId: ['', []]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('custToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/customerLogin');
    }

    this.fetchBookings();
  }

  fetchBookings(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{ success: boolean; bookings?: Booking[]; message?: string }>('https://localhost:7001/api/Customer/myBookings', { headers })
      .subscribe(
        response => {
          if (response.success) {
            this.bookings = response.bookings || [];
            console.log('Bookings:', this.bookings);
          } else {
            console.error('Error fetching bookings:', response.message);
            alert(response.message);
          }
        },
        error => {
          console.error('Error fetching bookings:', error);
          alert('Error fetching bookings. Please try again later.');
        }
      );
  }

  cancelBooking(bookingId: number): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{ success: boolean; message: string }>(`https://localhost:7001/api/Customer/cancelBooking/${bookingId}`, {}, { headers })
      .subscribe(
        response => {
          if (response.success) {
            alert(response.message);
            this.fetchBookings();
          } else {
            console.error('Error cancelling booking:', response.message);
            alert(response.message);
          }
        },
        error => {
          console.error('Error cancelling booking:', error);
          alert('Error cancelling booking. Please try again later.');
        }
      );
  }

  rescheduleBooking(bookingId: number): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const newDate = this.rescheduleForm.get('newDate')?.value;
    if (!newDate) {
        alert('Please select a new date.');
        return;
    }

    this.http.put<{ success: boolean; message: string }>(`https://localhost:7001/api/Customer/rescheduleBooking/${bookingId}?newDate=${newDate}`, {}, { headers })
        .subscribe(
            response => {
                if (response.success) {
                    alert(response.message);
                    this.fetchBookings();
                    this.rescheduleForm.reset();
                    this.selectedBookingId = null;
                } else {
                    console.error('Error rescheduling booking:', response.message);
                    alert(response.message);
                }
            },
            error => {
                console.error('Error rescheduling booking:', error);
                alert('Error rescheduling booking. Please try again later.');
            }
        );
  }

  ratePackage(packageId: number): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const ratingValue = this.ratingForm.get('ratingValue')?.value;
    const comment = this.ratingForm.get('comment')?.value;

    if (!ratingValue || !comment) {
        alert('Please provide a rating and comment.');
        return;
    }

    this.http.post<{ success: boolean; message: string }>(`https://localhost:7001/api/Customer/addRating`, {
        packageId,
        ratingValue,
        comment
    }, { headers }).subscribe(
        response => {
            if (response.success) {
                alert(response.message);
                this.ratingForm.reset();
            } else {
                console.error('Error submitting rating:', response.message);
                alert(response.message);
            }
        },
        error => {
            console.error('Error submitting rating:', error);
            alert('Error submitting rating. Please try again later.');
        }
    );
  }

  openRescheduleForm(bookingId: number): void {
    this.selectedBookingId = bookingId;
  }

  openRatingForm(packageId: number): void {
    this.ratingForm.reset();
    this.ratingForm.patchValue({ packageId });
  }
  
  openPaymentModal(bookingId: number): void {
    this.selectedBookingId = bookingId;
    this.showPaymentModal = true;
    this.paymentForm.reset();
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.selectedBookingId = null;
  }

  submitPayment(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const paymentMethod = this.paymentForm.get('paymentMethod')?.value;
    const transactionId = this.paymentForm.get('transactionId')?.value;

    if (!paymentMethod || !transactionId) {
        alert('Please fill in all payment details.');
        return;
    }

    const paymentData = {
        bookingId: this.selectedBookingId,
        paymentMethod: paymentMethod,
        transactionId: transactionId
    };

    this.http.post<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/addPayment', paymentData, { headers })
        .subscribe(
            response => {
                if (response.success) {
                    alert(response.message);
                    this.fetchBookings();
                    this.closePaymentModal();
                    this.paymentForm.reset();
                } else {
                    console.error('Error submitting payment:', response.message);
                    alert(response.message);
                }
            },
            error => {
                console.error('Error submitting payment:', error);
                alert('Failed to process payment. Please try again.');
            }
        );
  } 
}