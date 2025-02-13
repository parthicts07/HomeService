import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModalComponent } from '../../../response-modal/response-modal.component';

@Component({
  selector: 'app-customer-package',
  templateUrl: './customer-package.component.html',
  styleUrls: ['./customer-package.component.css']
})

export class CustomerPackageComponent implements OnInit {
  serviceId!: number;
  packages: any[] = [];
  serviceDetails: any = {};
  ratings: { [key: number]: { averageRating: number, reviews: any[] } } = {};

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('custToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/customerLogin');
    }
    
    this.serviceId = +this.route.snapshot.paramMap.get('serviceId')!;
    this.fetchServiceDetails();
    this.fetchPackages();
  }

  fetchServiceDetails(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{ success: boolean; serviceDetails?: any; message?: string }>(`https://localhost:7001/api/Customer/viewService/${this.serviceId}`, { headers })
      .subscribe(
        response => {
          if (response.success) {
            this.serviceDetails = response.serviceDetails.services;
            this.serviceDetails.professionalName = response.serviceDetails.professionalName;
            console.log('Service Details:', this.serviceDetails);
          } else {
            console.error('Error fetching service details:', response.message);
            console.log(response.message);
          }
        },
        error => {
          console.error('Error fetching service details', error);
          alert('Error fetching service details. Please try again later.');
        }
      );
  }

  fetchPackages(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{ success: boolean; packages?: any[]; message?: string }>(`https://localhost:7001/api/Customer/getPackagesByServiceId/${this.serviceId}`, { headers })
      .subscribe(
        response => {
          if (response.success) {
            this.packages = response.packages || []; // Provide a default empty array if packages is undefined
            this.packages.forEach(pkg => this.fetchRating(pkg.packageId));
            console.log('Packages:', this.packages);
          } else {
            console.error('Error fetching packages:', response.message);
            console.log(response.message);
          }
        },
        error => {
          console.error('Error fetching packages', error);
          alert('Error fetching packages. Please try again later.');
        }
      );
  }

  fetchRating(packageId: number): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{ success: boolean; ratings?: any[]; averageRating?: number; message?: string }>(`https://localhost:7001/api/Customer/showRating/${packageId}`, { headers })
      .subscribe(
        response => {
          if (response.success) {
            const reviews = response.ratings || []; 
            const averageRating = response.averageRating || 0; 
            this.ratings[packageId] = { averageRating, reviews };
            console.log('Ratings:', this.ratings[packageId]);
          } else {
            console.error('Error fetching ratings:', response.message);
            this.ratings[packageId] = { averageRating: 0, reviews: [] };
            console.log(response.message);
          }
        },
        error => {
          console.error('Error fetching ratings:', error);
          alert('Error fetching ratings. Please try again later.');
        }
      );
}

  showBookingForm(pkg: any): void {
    pkg.showBookingForm = true;
  }

  confirmBooking(pkg: any): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (!pkg.serviceAppointmentDate) {
        const modalRef = this.modalService.open(ResponseModalComponent);
        modalRef.componentInstance.title = 'Warning';
        modalRef.componentInstance.message = 'Please select an appointment date.';
        modalRef.componentInstance.type = 'error';
        return;
    }

    const localDateTime = this.formatToLocalISOString(pkg.serviceAppointmentDate);

    if (new Date(localDateTime) < new Date()) {
        const modalRef = this.modalService.open(ResponseModalComponent);
        modalRef.componentInstance.title = 'Warning';
        modalRef.componentInstance.message = 'Service appointment date cannot be earlier than today.';
        modalRef.componentInstance.type = 'error';
        return;
    }

    const bookingData = {
        packageId: pkg.packageId,
        serviceAppointmentDate: localDateTime
    };

    this.http.post<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/createBooking', bookingData, { headers })
        .subscribe({
            next: (response) => {
                const modalRef = this.modalService.open(ResponseModalComponent);
                modalRef.componentInstance.title = 'Success';
                modalRef.componentInstance.message = response.message;
                modalRef.componentInstance.type = 'success';
                pkg.bookingResponse = { success: true, message: response.message };
            },
            error: (error) => {
                console.error('Error creating booking', error);
                const modalRef = this.modalService.open(ResponseModalComponent);
                modalRef.componentInstance.title = 'Error';
                modalRef.componentInstance.message = 'Failed to create booking.';
                modalRef.componentInstance.type = 'error';
                pkg.bookingResponse = { success: false, message: 'Failed to create booking.' };
            }
        });
  }

  formatToLocalISOString(dateString: string): string {
      const date = new Date(dateString);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date.toISOString().slice(0, 19);
  }
}