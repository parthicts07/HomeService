import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface Payment {
  paymentId: number;
  bookingId: number;
  paymentMethod: string;
  transactionId: string;
  amount: number;
  paymentDate: string;
}

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.css']
})
export class CustomerPaymentsComponent implements OnInit{

  payments: Payment[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('custToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/customerLogin');
    }

    this.fetchPayments();
  }

  fetchPayments(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<{ success: boolean; payments?: Payment[]; message?: string }>('https://localhost:7001/api/Customer/myPayments', { headers })
      .subscribe(
        response => {
          if (response.success) {
            this.payments = response.payments || []; 
            console.log('Payments:', this.payments);
          } else {
            console.error('Error fetching payments:', response.message);
            alert(response.message);
          }
        },
        error => {
          console.error('Error fetching payments:', error);
          alert('Failed to fetch payments. Please try again.');
        }
      );
  }
}