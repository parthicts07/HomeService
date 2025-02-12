import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Report {
  reportId: number;
  reportedEntityId: number;
  reportType: string;
  reason: string;
  reportDate: string;
  isResolved: boolean;
}

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  reports: Report[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Report[]>('https://localhost:7001/api/Admin/reports', { headers })
    .subscribe(
      (reports) => {
        this.reports = reports;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  // resolveReport(reportId: number, flag: boolean): void {
  //   const token = localStorage.getItem('adminToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const body = { flag };

  //   this.http.put(`https://localhost:7001/api/Admin/resolveReport/${reportId}`, body, { headers }).subscribe(
  //     () => {
  //       this.fetchReports();
  //     },
  //     (error) => {
  //       console.error('Error resolving report:', error);
  //     }
  //   );
  // }

  resolveReport(reportId: number, flag: boolean): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { flag };
  
    this.http.put<{success: boolean, message?: string}>(`https://localhost:7001/api/Admin/resolveReport/${reportId}`, body, { headers }).subscribe(
      response => {
        if (response.success) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Report resolved successfully!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.fetchReports();
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'There was an error resolving the report!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
      error => {
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'There was an error resolving the report!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.error('Error resolving report:', error);
      }
    );
  }
}