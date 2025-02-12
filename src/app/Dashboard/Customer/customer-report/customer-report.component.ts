// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import Swal from 'sweetalert2';

// interface Entity {
//   id: number;
//   name: string;
// }

// @Component({
//   selector: 'app-customer-report',
//   templateUrl: './customer-report.component.html',
//   styleUrls: ['./customer-report.component.css']
// })
// export class CustomerReportComponent implements OnInit {
//   reportModel = {
//     reportedEntityId: null,
//     reportType: '',
//     reason: ''
//   };
//   entities: Entity[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {}

//   loadEntities(): void {
//     const token = localStorage.getItem('custToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     let url = '';

//     switch (this.reportModel.reportType) {
//       case 'User':
//         url = 'https://localhost:7001/api/Customer/getAllProfessional';
//         break;
//       case 'Service':
//         url = 'https://localhost:7001/api/Customer/getAllService';
//         break;
//       case 'Package':
//         url = 'https://localhost:7001/api/Customer/getAllPackages';
//         break;
//     }

//     this.http.get<any[]>(url, { headers }).subscribe(
//       (entities) => {
//         this.entities = entities.map(entity => ({
//           id: entity.userId || entity.serviceId || entity.packageId,
//           name: entity.userName || entity.serviceName || entity.packageName
//         }));
//       },
//       (error) => {
//         console.error('Error loading entities:', error);
//       }
//     );
//   }

//   reportEntity(): void {
//     const token = localStorage.getItem('custToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http.post<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/report', this.reportModel, { headers }).subscribe(
//       (response) => {
//         if (response.success) {
//           Swal.fire({
//             title: 'Report submitted successfully!',
//             text: response.message,
//             icon: 'success',
//             timer: 2000,
//             showConfirmButton: false
//           }).then(() => {
//             this.reportModel = { reportedEntityId: null, reportType: '', reason: '' };
//             this.entities = [];
//           });
//         } else {
//           Swal.fire({
//             title: 'Error submitting report',
//             text: response.message,
//             icon: 'error',
//             confirmButtonText: 'OK'
//           });
//         }
//       },
//       (error) => {
//         console.error('Error submitting report:', error);
//         Swal.fire({
//           title: 'Error submitting report',
//           text: 'Please try again later.',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//       }
//     );
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import Swal from 'sweetalert2';

// interface Entity {
//   id: number;
//   name: string;
// }

// @Component({
//   selector: 'app-customer-report',
//   templateUrl: './customer-report.component.html',
//   styleUrls: ['./customer-report.component.css']
// })
// export class CustomerReportComponent implements OnInit {
//   reportModel = {
//     reportedEntityId: null,
//     reportType: '',
//     reason: ''
//   };
//   entities: Entity[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {}

//   loadEntities(): void {
//     const token = localStorage.getItem('custToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     let url = '';

//     switch (this.reportModel.reportType) {
//       case 'User':
//         url = 'https://localhost:7001/api/Customer/getAllProfessional';
//         break;
//       case 'Service':
//         url = 'https://localhost:7001/api/Customer/getAllService';
//         break;
//       case 'Package':
//         url = 'https://localhost:7001/api/Customer/getAllPackages';
//         break;
//     }

//     this.http.get<any>(url, { headers }).subscribe(
//       (response) => {
//         console.log('API response:', response); 
//         if (Array.isArray(response)) {
//           this.entities = response.map(entity => ({
//             id: entity.userId || entity.serviceId || entity.packageId,
//             name: entity.userName || entity.serviceName || entity.packageName
//           }));
//         } else {
//           console.error('API response is not an array:', response);
//         }
//       },
//       (error) => {
//         console.error('Error loading entities:', error);
//       }
//     );
//   }

//   reportEntity(): void {
//     const token = localStorage.getItem('custToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http.post<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/report', this.reportModel, { headers }).subscribe(
//       (response) => {
//         if (response.success) {
//           Swal.fire({
//             title: 'Report submitted successfully!',
//             text: response.message,
//             icon: 'success',
//             timer: 2000,
//             showConfirmButton: false
//           }).then(() => {
//             this.reportModel = { reportedEntityId: null, reportType: '', reason: '' };
//             this.entities = [];
//           });
//         } else {
//           Swal.fire({
//             title: 'Error submitting report',
//             text: response.message,
//             icon: 'error',
//             confirmButtonText: 'OK'
//           });
//         }
//       },
//       (error) => {
//         console.error('Error submitting report:', error);
//         Swal.fire({
//           title: 'Error submitting report',
//           text: 'Please try again later.',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//       }
//     );
//   }
// }







import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Entity {
  id: number;
  name: string;
}

interface Professional {
  userId?: number;
  userName?: string;
  serviceId?: number;
  serviceName?: string;
  packageId?: number;
  packageName?: string;
}

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {
  reportModel = {
    reportedEntityId: null,
    reportType: '',
    reason: ''
  };
  entities: Entity[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  loadEntities(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url = '';

    switch (this.reportModel.reportType) {
      case 'User':
        url = 'https://localhost:7001/api/Customer/getAllProfessional';
        break;
      case 'Service':
        url = 'https://localhost:7001/api/Customer/getAllService';
        break;
      case 'Package':
        url = 'https://localhost:7001/api/Customer/getAllPackages';
        break;
    }

    this.http.get<{ success: boolean; professional: Professional[] }>(url, { headers }).subscribe(
      (response) => {
        console.log('API response:', response); // Debugging line
        if (response.success && Array.isArray(response.professional)) {
          this.entities = response.professional.map((entity: Professional) => ({
            id: entity.userId || entity.serviceId || entity.packageId || 0, // Default to 0 if undefined
            name: entity.userName || entity.serviceName || entity.packageName || 'Unknown' // Default to 'Unknown' if undefined
          }));
        } else {
          console.error('API response is not as expected:', response);
        }
      },
      (error) => {
        console.error('Error loading entities:', error);
      }
    );
  }

  reportEntity(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/report', this.reportModel, { headers }).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire({
            title: 'Report submitted successfully!',
            text: response.message,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.reportModel = { reportedEntityId: null, reportType: '', reason: '' };
            this.entities = [];
          });
        } else {
          Swal.fire({
            title: 'Error submitting report',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        console.error('Error submitting report:', error);
        Swal.fire({
          title: 'Error submitting report',
          text: 'Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}




  // reportEntity(): void {
  //   const token = localStorage.getItem('custToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.post('https://localhost:7001/api/Customer/report', this.reportModel, { headers }).subscribe(
  //     () => {
  //       alert('Report submitted successfully.');
  //       this.reportModel = { reportedEntityId: null, reportType: '', reason: '' };
  //       this.entities = [];
  //     },
  //     (error) => {
  //       console.error('Error submitting report:', error);
  //       alert('Error submitting report. Please try again later.');
  //     }
  //   );
  // }