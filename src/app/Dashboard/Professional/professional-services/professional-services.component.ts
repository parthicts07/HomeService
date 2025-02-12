import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

interface Professional {
  professionalName: string;
  bio: string;
  profilePictureUrl: string;
  experienceYears: number;
  isApproved: boolean;
  skills: string;
  service: string;
  nationality: string;
  aadhaarCard: string;
  userId: number;
  userName: string;
  password: string;
  email: string;
  mobileNumber: string;
  role: number;
  isFlagged: boolean;
}

interface Service {
  serviceId: number;
  serviceName: string;
  description: string;
  servicePictureUrl: string | null;
  isFlagged: boolean;
  professionalId: number;
  professional: Professional;
  packages: any;
}

@Component({
  selector: 'app-professional-services',
  templateUrl: './professional-services.component.html',
  styleUrls: ['./professional-services.component.css']
})
export class ProfessionalServicesComponent implements OnInit {
  services: Service[] = [];
  isAddServiceModalVisible = false;
  addServiceForm: FormGroup;
  selectedFile: File | null = null;
  isUpdatingServicePicture: boolean = false;
  serviceIdToUpdate: number | null = null;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.addServiceForm = this.fb.group({
      serviceName: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('profToken');
    if(!token){
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('/login/professionalLogin');
    }
    this.fetchServices();
  }

  fetchServices(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{success: boolean, services?: Service[], message?: string}>('https://localhost:7001/api/Professional/getAllServices', { headers }).subscribe(
      (response) => {
        if(response.success){
          this.services = response.services || [];
          console.log(this.services);
        }
        else{
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  viewDetails(serviceId: number): void {
    this.router.navigate([`/professional/service/${serviceId}/packages`]);
  }

  // onSubmitAddService() {
  //   if (this.addServiceForm.invalid) {
  //     alert('Please fill in all required fields.');
  //     return;
  //   }
  //   const token = localStorage.getItem('profToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.post('https://localhost:7001/api/Professional/createService', this.addServiceForm.value, { headers }).subscribe(
  //     () => {
  //       this.fetchServices();
  //       this.addServiceForm.reset();
  //       this.hideAddServiceModal();
  //     },
  //     (error: HttpErrorResponse) => {
  //       if (error.status === 400) {
  //         alert('Bad Request. Please check the data you have entered.');
  //       } else if (error.status === 401) {
  //         alert('Unauthorized access. Please log in again.');
  //         this.router.navigateByUrl('login/professionalLogin');
  //       } else {
  //         alert('Error creating service. Please try again later.');
  //       }
  //     }
  //   );
  // }

  onSubmitAddService(): void {
    if (this.addServiceForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'warning',
        title: 'Please fill in all required fields.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post<{ success: boolean, message?: string }>('https://localhost:7001/api/Professional/createService', this.addServiceForm.value, { headers })
    .subscribe(
      (response) => {
        if (response.success) {
          this.fetchServices();
          this.addServiceForm.reset();
          this.hideAddServiceModal();
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: response.message || 'Service created successfully.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'Error creating service.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating service:', error);
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Error creating service. Please try again later.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    );
  }

  showAddServiceModal(): void {
    this.isAddServiceModalVisible = true;
  }
  
  hideAddServiceModal(): void {
    this.isAddServiceModalVisible = false;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // onSubmitUpdateServicePicture(): void {
  //   const token = localStorage.getItem('profToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   if (this.selectedFile && this.serviceIdToUpdate !== null) {
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile);

  //     this.http.put<{ success: boolean; message: string }>(`https://localhost:7001/api/Professional/uploadServicePicture/${this.serviceIdToUpdate}`, formData, { headers })
  //       .subscribe(
  //         (response) => {
  //           if (response.success) {
  //             console.log('Service picture updated successfully:', response.message);
  //             this.isUpdatingServicePicture = false;
  //             this.serviceIdToUpdate = null;
  //             this.fetchServices();
  //             alert(response.message);
  //           } else {
  //             console.error('Error updating service picture:', response.message);
  //             alert(response.message);
  //           }
  //         },
  //         (error) => {
  //           console.error('Error updating service picture:', error);
  //           alert('Error updating service picture. Please try again later.');
  //         }
  //       );
  //   }
  // }

  onSubmitUpdateServicePicture(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (this.selectedFile && this.serviceIdToUpdate !== null) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.put<{ success: boolean; message: string }>(`https://localhost:7001/api/Professional/uploadServicePicture/${this.serviceIdToUpdate}`, formData, { headers })
        .subscribe(
          (response) => {
            if (response.success) {
              console.log('Service picture updated successfully:', response.message);
              this.isUpdatingServicePicture = false;
              this.serviceIdToUpdate = null;
              this.fetchServices();
              Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'success',
                title: response.message || 'Service picture updated successfully.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
            } else {
              console.error('Error updating service picture:', response.message);
              Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: response.message || 'Error updating service picture.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
            }
          },
          (error) => {
            console.error('Error updating service picture:', error);
            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'error',
              title: 'Error updating service picture. Please try again later.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        );
    }
  }

  toggleUpdateServicePictureForm(serviceId: number): void {
    this.isUpdatingServicePicture = !this.isUpdatingServicePicture;
    this.serviceIdToUpdate = serviceId;
  }
}