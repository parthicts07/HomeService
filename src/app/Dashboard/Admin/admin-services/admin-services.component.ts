import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Service {
  serviceId: number;
  serviceName: string;
  description: string;
  servicePictureUrl: string | null;
  isFlagged: boolean;
  professionalId: number;
  professional: any;
  packages: any;
}

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/adminLogin');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Service[]>('https://localhost:7001/api/Admin/getAllServices', {headers})
      .subscribe((data: Service[]) => {
        this.services = data;
      }, error => {
        console.error('There was an error fetching the services!', error);
      });
  }

  // flagService(serviceId: number): void {
  //   const token = localStorage.getItem('adminToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.put(`https://localhost:7001/api/Admin/flagService/${serviceId}`, {}, {headers})
  //     .subscribe(response => {
  //       alert('Service flagged successfully!');
  //       this.updateServiceFlagStatus(serviceId, true);
  //     }, error => {
  //       console.error('There was an error flagging the service!', error);
  //     });
  // }

  // unflagService(serviceId: number): void {
  //   const token = localStorage.getItem('adminToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.put(`https://localhost:7001/api/Admin/unFlagService/${serviceId}`, {}, {headers})
  //     .subscribe(response => {
  //       alert('Service unflagged successfully!');
  //       this.updateServiceFlagStatus(serviceId, false);
  //     }, error => {
  //       console.error('There was an error unflagging the service!', error);
  //     });
  // }

  flagService(serviceId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/flagService/${serviceId}`, {}, {headers})
      .subscribe(response => {
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Service flagged successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.updateServiceFlagStatus(serviceId, true);
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error flagging the service!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }, error => {
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'There was an error flagging the service!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('There was an error flagging the service!', error);
      });
  }
  
  unflagService(serviceId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/unFlagService/${serviceId}`, {}, {headers})
      .subscribe(response => {
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Service unflagged successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.updateServiceFlagStatus(serviceId, false);
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error unflagging the service!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }, error => {
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'There was an error unflagging the service!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('There was an error unflagging the service!', error);
      });
  }

  private updateServiceFlagStatus(serviceId: number, isFlagged: boolean): void {
    this.services = this.services.map(service => 
      service.serviceId === serviceId ? { ...service, isFlagged } : service
    );
  }
}