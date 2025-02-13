import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Package {
  packageId: number;
  packageName: string;
  price: number;
  details: string;
  isFlagged: boolean;
  serviceId: number;
  service: any;
}

@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.css']
})
export class AdminPackagesComponent implements OnInit {
  packages: Package[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/adminLogin');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Package[]>('https://localhost:7001/api/Admin/getAllPackages', {headers})
      .subscribe((data: Package[]) => {
        this.packages = data;
      }, error => {
        console.error('There was an error fetching the packages!', error);
      });
  }

  flagPackage(packageId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/flagPackage/${packageId}`, {}, {headers})
      .subscribe(response => {
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Package flagged successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.updatePackageFlagStatus(packageId, true);
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error flagging the package!',
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
          title: 'There was an error flagging the package!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('There was an error flagging the package!', error);
      });
  }
  
  unflagPackage(packageId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/unFlagPackage/${packageId}`, {}, {headers})
      .subscribe(response => {
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Package unflagged successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.updatePackageFlagStatus(packageId, false);
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error unflagging the package!',
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
          title: 'There was an error unflagging the package!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('There was an error unflagging the package!', error);
      });
  }

  private updatePackageFlagStatus(packageId: number, isFlagged: boolean): void {
    this.packages = this.packages.map(pkg => 
      pkg.packageId === packageId ? { ...pkg, isFlagged } : pkg
    );
  }
}