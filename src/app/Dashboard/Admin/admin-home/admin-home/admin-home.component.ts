import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  usersCount: number = 0;
  professionalsCount: number = 0;
  servicesCount: number = 0;
  packagesCount: number = 0;
  pendingRequests: any[] = [];
  reports: any[] = [];

  private baseUrl = 'https://localhost:7001/api/Admin';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/adminLogin');
    }
    this.fetchData();
  }

  fetchData(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(`${this.baseUrl}/getAllUsers`, {headers}).subscribe((data: any) => {
      const customers = data.filter((user: any) => user.role === 1);
      const professionals = data.filter((user: any) => user.role === 2);
      this.usersCount = customers.length;
      this.professionalsCount = professionals.length;
    });

    this.http.get(`${this.baseUrl}/getAllServices`, {headers}).subscribe((data: any) => {
      this.servicesCount = data.length;
    });

    this.http.get(`${this.baseUrl}/getAllPackages`, {headers}).subscribe((data: any) => {
      this.packagesCount = data.length;
    });

    this.http.get(`${this.baseUrl}/getUnApprovedProfessional`, {headers}).subscribe((data: any) => {
      this.pendingRequests = data;
    });

    this.http.get(`${this.baseUrl}/reports`, {headers}).subscribe((data: any) => {
      this.reports = data;
    });
  }
}