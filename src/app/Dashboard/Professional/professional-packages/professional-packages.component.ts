// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// interface Package {
//   packageId: number;
//   packageName: string;
//   price: number;
//   details: string;
//   serviceId: number;
// }

// @Component({
//   selector: 'app-professional-packages',
//   templateUrl: './professional-packages.component.html',
//   styleUrls: ['./professional-packages.component.css']
// })
// export class ProfessionalPackagesComponent implements OnInit {
//   packages: Package[] = [];
//   serviceId: number;

//   constructor(private http: HttpClient, private route: ActivatedRoute) {
//     this.serviceId = this.route.snapshot.params['serviceId'];
//   }

//   ngOnInit(): void {
//     this.fetchPackages();
//   }

//   fetchPackages(): void {
//     const token = localStorage.getItem('profToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http.get<Package[]>(`https://localhost:7001/api/Professional/getPackagesByServiceId/${this.serviceId}`, { headers }).subscribe(
//       (packages) => {
//         this.packages = packages;
//       },
//       (error) => {
//         console.error('Error fetching packages:', error);
//       }
//     );
//   }

//   addPackage(): void {
//     // Logic to add a new package
//   }

//   editPackage(packageId: number): void {
//     // Logic to edit a package
//   }

//   deletePackage(packageId: number): void {
//     const token = localStorage.getItem('profToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http.delete(`https://localhost:7001/api/Professional/deletePackage/${packageId}`, { headers }).subscribe(
//       () => {
//         this.fetchPackages();
//       },
//       (error) => {
//         console.error('Error deleting package:', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

interface Package {
  packageId: number;
  packageName: string;
  price: number;
  details: string;
  serviceId: number;
}

@Component({
  selector: 'app-professional-packages',
  templateUrl: './professional-packages.component.html',
  styleUrls: ['./professional-packages.component.css']
})
export class ProfessionalPackagesComponent implements OnInit {
  packages: Package[] = [];
  serviceId: number;
  isAddPackageModalVisible = false;
  isEditPackageModalVisible = false;
  addPackageForm: FormGroup;
  editPackageForm: FormGroup;
  packageIdToEdit: number | null = null;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router
  ) 
  {
    this.serviceId = this.route.snapshot.params['serviceId'];
    this.addPackageForm = this.fb.group({
      packageName: [''],
      price: [0],
      details: [''],
      serviceId: [this.serviceId]
    });
    this.editPackageForm = this.fb.group({
      packageName: [''],
      price: [0],
      details: [''],
      serviceId: [0]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('profToken');
    if(!token){
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('/login/professionalLogin');
    }
    this.fetchPackages();
  }

  fetchPackages(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<{success: boolean, packages?: Package[], message?: string}>(`https://localhost:7001/api/Professional/getPackagesByServiceId/${this.serviceId}`, { headers }).subscribe(
      (response) => {
        if (response.success){
          this.packages = response.packages || [];
          console.log(this.packages);
        }
        else{
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error fetching packages:', error);
      }
    );
  }

  // addPackage(): void {
  //   if (this.addPackageForm.invalid) {
  //     alert('Please fill in all required fields.');
  //     return;
  //   }
  //   const token = localStorage.getItem('profToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.post<{success: boolean, message?: string}>('https://localhost:7001/api/Professional/createPackage', this.addPackageForm.value, { headers }).subscribe(
  //     (response) => {
  //       if(response.success){
  //         this.fetchPackages();
  //         this.addPackageForm.reset();
  //         this.hideAddPackageModal();

  //       }
  //       else{
  //         alert(response.message);
  //       }

  //     },
  //     (error: HttpErrorResponse) => {
  //       if (error.status === 400) {
  //         alert('Bad Request. Please check the data you have entered.');
  //       } else if (error.status === 401) {
  //         alert('Unauthorized access. Please log in again.');
  //       } else {
  //         alert('Error creating package. Please try again later.');
  //       }
  //     }
  //   );
  // }

  addPackage(): void {
    if (this.addPackageForm.invalid) {
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
    this.http.post<{ success: boolean, message?: string }>('https://localhost:7001/api/Professional/createPackage', this.addPackageForm.value, { headers }).subscribe(
      (response) => {
        if (response.success) {
          this.fetchPackages();
          this.addPackageForm.reset();
          this.hideAddPackageModal();
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: response.message || 'Package created successfully.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'Error creating package.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
      (error) => {
        console.error('Error creating package:', error);
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Error creating package. Please try again later.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    );
  }

  // editPackage(packageId: number): void {
  //   const selectedPackage = this.packages.find(pkg => pkg.packageId === packageId);
  //   if (selectedPackage) {
  //     this.packageIdToEdit = packageId;
  //     this.editPackageForm.patchValue(selectedPackage);
  //     this.showEditPackageModal();
  //   }
  // }

  // updatePackage(): void {
  //   if (this.editPackageForm.invalid) {
  //     alert('Please fill in all required fields.');
  //     return;
  //   }
  //   const token = localStorage.getItem('profToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.put(`https://localhost:7001/api/Professional/editPackage/${this.packageIdToEdit}`, this.editPackageForm.value, { headers }).subscribe(
  //     () => {
  //       this.fetchPackages();
  //       this.editPackageForm.reset();
  //       this.hideEditPackageModal();
  //     },
  //     (error: HttpErrorResponse) => {
  //       if (error.status === 400) {
  //         alert('Bad Request. Please check the data you have entered.');
  //       } else if (error.status === 401) {
  //         alert('Unauthorized access. Please log in again.');
  //       } else {
  //         alert('Error updating package. Please try again later.');
  //       }
  //     }
  //   );
  // }

  editPackage(packageId: number): void {
    const selectedPackage = this.packages.find(pkg => pkg.packageId === packageId);
    if (selectedPackage) {
      this.packageIdToEdit = packageId;
      this.editPackageForm.patchValue(selectedPackage);
      this.showEditPackageModal();
    }
  }
  
  updatePackage(): void {
    if (this.editPackageForm.invalid) {
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
    this.http.put<{ success: boolean, message?: string }>(`https://localhost:7001/api/Professional/editPackage/${this.packageIdToEdit}`, this.editPackageForm.value, { headers }).subscribe(
      (response) => {
        if (response.success) {
          this.fetchPackages();
          this.editPackageForm.reset();
          this.hideEditPackageModal();
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: response.message || 'Package updated successfully.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'Error updating package.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
      (error) => {
        console.error('Error updating package:', error);
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Error updating package. Please try again later.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    );
  }

  // deletePackage(packageId: number): void {
  //   const token = localStorage.getItem('profToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.delete(`https://localhost:7001/api/Professional/deletePackage/${packageId}`, { headers }).subscribe(
  //     () => {
  //       this.fetchPackages();
  //     },
  //     (error) => {
  //       console.error('Error deleting package:', error);
  //     }
  //   );
  // }

  deletePackage(packageId: number): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete<{ success: boolean, message?: string }>(`https://localhost:7001/api/Professional/deletePackage/${packageId}`, { headers })
    .subscribe(
      (response) => {
        if (response.success) {
          this.fetchPackages();
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: response.message || 'Package deleted successfully.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: response.message || 'Error deleting package.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
      (error) => {
        console.error('Error deleting package:', error);
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Error deleting package. Please try again later.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    );
  }

  showAddPackageModal(): void {
    this.isAddPackageModalVisible = true;
  }

  hideAddPackageModal(): void {
    this.isAddPackageModalVisible = false;
  }

  showEditPackageModal(): void {
    this.isEditPackageModalVisible = true;
  }

  hideEditPackageModal(): void {
    this.isEditPackageModalVisible = false;
  }
}