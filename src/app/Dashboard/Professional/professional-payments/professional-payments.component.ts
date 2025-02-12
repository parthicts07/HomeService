import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional-payments',
  templateUrl: './professional-payments.component.html',
  styleUrls: ['./professional-payments.component.css']
})
export class ProfessionalPaymentsComponent {
  payments: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(!token){
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('/login/professionalLogin');
    }
    this.http.get<{success: boolean, payments?: any[], message?: string }>('https://localhost:7001/api/Professional/getPayments', {headers})
    .subscribe(
      (response) => {
        if(response.success){
          this.payments = response.payments || [];
          this.isLoading = false;
          console.log(this.payments);
        }
        else{
          console.error(response.message);
        }
      },
      (error) => {
        this.error = 'Failed to load payments. Please try again later.';
        this.isLoading = false;
      }
    );
  };
}
