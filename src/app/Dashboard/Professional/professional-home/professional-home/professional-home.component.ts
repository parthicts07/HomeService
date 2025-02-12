import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

interface Professional {
  professionalName: string;
  bio: string | null;
  profilePictureUrl: string | null;
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
  servicePictureUrl: string;
  description: string;
  isFlagged: boolean;
  professionalId: number;
  professional: Professional;
  packages: any;
}

@Component({
  selector: 'app-professional-home',
  templateUrl: './professional-home.component.html',
  styleUrls: ['./professional-home.component.css']
})
export class ProfessionalHomeComponent implements OnInit {

  profile: any = {
    professionalName: '',
    bio: '',
    profilePictureUrl: '',
    experienceYears: 0,
    skills: '',
    service: '',
    nationality: '',
    aadhaarCard: '',
    email: '',
    mobileNumber: ''
  };

  isAddServiceModalVisible = false;
  services: Service[] = [];

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    const token = localStorage.getItem('profToken');
    if (!token) {
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('login/professionalLogin');
    } else {
      this.fetchProfessionalProfile();
      this.fetchServices();
    }
  }

  fetchProfessionalProfile(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get<{ success: boolean; professional?: any; message?: string }>('https://localhost:7001/api/Professional/viewProfile', { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            this.profile = response.professional;
            console.log('Professional Profile:', this.profile);
          } else {
            console.error('Error fetching professional profile:', response.message);
            alert(response.message);
          }
        },
        (error) => {
          console.error('Error fetching professional profile:', error);
          alert('Error fetching professional profile. Please try again later.');
        }
      );
  }

  fetchServices() {
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
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert('Unauthorized access. Please log in again.');
          this.router.navigateByUrl('login/professionalLogin');
        }
      }
    );
  }
}