import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Customer, Package } from '../../../Models/customer.model';
import { Service } from '../../../Models/services.model';
import { CustomerService } from 'src/app/Services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})

// export class CustomerHomeComponent implements OnInit {
//   customer: Customer = {} as Customer;
//   services: Service[] = [];
//   serviceId: string | null = null;
//   selectedServiceId: number | null = null;

//   constructor(
//     private http: HttpClient, 
//     private router: Router, 
//     private route: ActivatedRoute,
//     private service: CustomerService,
//     private modalService: NgbModal
//   ) { }

//   ngOnInit(): void {
//     this.fetchCustomerDetails();
//     this.fetchServices();
//   }

//   fetchCustomerDetails(): void {
//     const token = localStorage.getItem('custToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//       this.http
//       .get<{ success: boolean; customer?: any; message?: string }>('https://localhost:7001/api/Customer/viewProfile', { headers })
//       .subscribe(
//         (response) => {
//           if (response.success) {
//             this.customer = response.customer;
//             console.log('Customer Profile:', this.customer);
//           } else {
//             console.error('Error fetching customer profile:', response.message);
//             alert(response.message);
//           }
//         },
//         (error) => {
//           console.error('Error fetching customer profile:', error);
//           alert('Error fetching customer profile. Please try again later.');
//         }
//       );
//   }

//   fetchServices(): void {
//     const token = localStorage.getItem('custToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http.get<{ success: boolean, services?: Service[], message?: string }>('https://localhost:7001/api/Customer/getAllService', { headers })
//       .subscribe(
//         response => {
//           if (response.success) {
//             this.services = response.services || [];
//             console.log('Services:', this.services);
//           } else {
//             console.error('Error fetching services:', response.message);
//           }
//         },
//         error => {
//           console.error('Error fetching services', error);
//         }
//       );
//   }

//   viewDetails(serviceId: number){
//     this.router.navigate(['/customer/packages', serviceId]);
//   }
// }

export class CustomerHomeComponent implements OnInit {
  customer: Customer = {} as Customer;
  services: Service[] = [];
  filteredServices: Service[] = [];
  searchTerm: string = '';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute,
    private service: CustomerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchCustomerDetails();
    this.fetchServices();
  }

  fetchCustomerDetails(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<{ success: boolean; customer?: any; message?: string }>('https://localhost:7001/api/Customer/viewProfile', { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            this.customer = response.customer;
            console.log('Customer Profile:', this.customer);
          } else {
            console.error('Error fetching customer profile:', response.message);
            alert(response.message);
          }
        },
        (error) => {
          console.error('Error fetching customer profile:', error);
          alert('Error fetching customer profile. Please try again later.');
        }
      );
  }

  fetchServices(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{ success: boolean, services?: Service[], message?: string }>('https://localhost:7001/api/Customer/getAllService', { headers })
      .subscribe(
        response => {
          if (response.success) {
            this.services = response.services || [];
            this.filteredServices = this.services;
            console.log('Services:', this.services);
          } else {
            console.error('Error fetching services:', response.message);
          }
        },
        error => {
          console.error('Error fetching services', error);
        }
      );
  }

  filterServices(): void {
    this.filteredServices = this.services.filter(service =>
      service.serviceName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewDetails(serviceId: number): void {
    this.router.navigate(['/customer/packages', serviceId]);
  }
}