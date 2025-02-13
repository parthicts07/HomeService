import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface User {
  userId: number;
  userName: string;
  password: string;
  email: string;
  mobileNumber: string;
  role: number;
  isFlagged: boolean;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  customers: User[] = [];
  professionals: User[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/adminLogin');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<User[]>('https://localhost:7001/api/Admin/getAllUsers', {headers})
      .subscribe((data: User[]) => {
        this.customers = data.filter(user => user.role === 1);
        this.professionals = data.filter(user => user.role === 2);
      }, error => {
        console.error('There was an error fetching the users!', error);
      });
  }

  flagUser(userId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/flagUser/${userId}`, {}, {headers})
      .subscribe(response => {
        console.log(response);
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'User flagged successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.updateUserFlagStatus(userId, true);
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error flagging the user!',
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
          title: 'There was an error flagging the user!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('There was an error flagging the user!', error);
      });
  }
  
  unflagUser(userId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/unFlagUser/${userId}`, {}, {headers})
      .subscribe(response => {
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'User unflagged successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.updateUserFlagStatus(userId, false);
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error unflagging the user!',
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
          title: 'There was an error unflagging the user!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('There was an error unflagging the user!', error);
      });
  }
  

  private updateUserFlagStatus(userId: number, isFlagged: boolean): void {
    this.customers = this.customers.map(user => 
      user.userId === userId ? { ...user, isFlagged } : user
    );
    this.professionals = this.professionals.map(user => 
      user.userId === userId ? { ...user, isFlagged } : user
    );
  }
}