import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Professional {
  professionalName: string;
  bio: string;
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

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {
  professionals: Professional[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/adminLogin');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Professional[]>('https://localhost:7001/api/Admin/getUnApprovedProfessional',{headers})
      .subscribe((data: Professional[]) => {
        this.professionals = data;
      }, error => {
        console.error('There was an error fetching the professionals!', error);
      });
  }

  // approveProfessional(userId: number): void {
  //   const token = localStorage.getItem('adminToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.put(`https://localhost:7001/api/Admin/approveProfessional/${userId}`, {}, {headers})
  //     .subscribe(response => {
  //       alert('Professional approved successfully!');
  //       this.professionals = this.professionals.filter(prof => prof.userId !== userId);
  //     }, error => {
  //       console.error('There was an error approving the professional!', error);
  //     });
  // }

  approveProfessional(userId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/approveProfessional/${userId}`, {}, {headers})
      .subscribe(response => {
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Professional approved successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.professionals = this.professionals.filter(prof => prof.userId !== userId);
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error approving the professional!',
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
          title: 'There was an error approving the professional!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('There was an error approving the professional!', error);
      });
  }
  
}