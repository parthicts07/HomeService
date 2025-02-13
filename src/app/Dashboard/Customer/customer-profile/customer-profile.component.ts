import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  customer: any = {};
  isEditing: boolean = false;
  isChangingPassword: boolean = false;
  editProfileForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('custToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/customerLogin');
    }
    this.fetchCustomerProfile();
    this.initForms();
  }

  fetchCustomerProfile(): void {
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get<{ success: boolean; customer?: any; message?: string }>('https://localhost:7001/api/Customer/viewProfile', { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            this.customer = response.customer;
            console.log('Customer Profile:', this.customer);
          } else {
            console.error('Error fetching customer profile:', response.message);
            alert(response.message);
          }
        },
        (error) => {
          console.error('Error fetching customer profile:', error);
          alert('Error fetching customer profile. Please try again later.');
        }
      );
  }

  initForms(): void {
    this.editProfileForm = this.fb.group({
        email: [this.customer.email, [Validators.required, Validators.email]],
        customerName: [this.customer.customerName, Validators.required],
        mobileNumber: [this.customer.mobileNumber, Validators.required],
        address: [this.customer.address, Validators.required],
        city: [this.customer.city],
        state: [this.customer.state],
        zipCode: [this.customer.zipCode],
    });

    this.changePasswordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, this.validatePassword]],
        confirmNewPassword: ['', Validators.required],
    });
  }

  validatePassword(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    if (!password) {
        return { required: true };
    } else if (password.length < 8) {
        return { weak: true };
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password) || !/[@#$%^&*]/.test(password)) {
        return { average: true };
    } else {
        return null;
    }
  }

  toggleEditForm(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editProfileForm.patchValue(this.customer);
    }
  }

  toggleChangePasswordForm(): void {
    this.isChangingPassword = !this.isChangingPassword;
  }

  // onSubmitEditProfile(): void {
  //   if (this.editProfileForm.invalid) {
  //       return;
  //   }
  //   const token = localStorage.getItem('custToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.put<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/editProfile', this.editProfileForm.value, { headers })
  //       .subscribe(
  //           (response) => {
  //               if (response.success) {
  //                   console.log('Profile updated successfully:', response.message);
  //                   this.fetchCustomerProfile();
  //                   this.isEditing = false;
  //                   alert(response.message);
  //               } else {
  //                   console.error('Error updating profile:', response.message);
  //                   alert(response.message);
  //               }
  //           },
  //           (error) => {
  //               console.error('Error updating profile:', error);
  //               alert('Error updating profile. Please try again later.');
  //           }
  //       );
  // }

  onSubmitEditProfile(): void {
    if (this.editProfileForm.invalid) {
      return;
    }
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/editProfile', this.editProfileForm.value, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            console.log('Profile updated successfully:', response.message);
            this.fetchCustomerProfile();
            this.isEditing = false;
            Swal.fire({
              title: 'Profile updated successfully!',
              text: response.message,
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          } else {
            console.error('Error updating profile:', response.message);
            Swal.fire({
              title: 'Error updating profile',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        (error) => {
          console.error('Error updating profile:', error);
          Swal.fire({
            title: 'Error updating profile',
            text: 'Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }

  // onSubmitChangePassword(): void {
  //   if (this.changePasswordForm.invalid) {
  //       return;
  //   }
  //   console.log(this.changePasswordForm.value);
  //   const token = localStorage.getItem('custToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.put<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/changePassword', this.changePasswordForm.value, { headers })
  //       .subscribe(
  //           (response) => {
  //               if (response.success) {
  //                   console.log('Password changed successfully:', response.message);
  //                   this.isChangingPassword = false;
  //                   alert(response.message);
  //               } else {
  //                   console.error('Error changing password:', response.message);
  //                   alert(response.message);
  //               }
  //           },
  //           (error) => {
  //               console.error('Error changing password:', error);
  //               alert('Error changing password. Please try again later.');
  //           }
  //       );
  // }

  onSubmitChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }
    console.log(this.changePasswordForm.value);
    const token = localStorage.getItem('custToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<{ success: boolean; message: string }>('https://localhost:7001/api/Customer/changePassword', this.changePasswordForm.value, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            console.log('Password changed successfully:', response.message);
            this.isChangingPassword = false;
            Swal.fire({
              title: 'Password changed successfully!',
              text: response.message,
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          } else {
            console.error('Error changing password:', response.message);
            Swal.fire({
              title: 'Error changing password',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        (error) => {
          console.error('Error changing password:', error);
          Swal.fire({
            title: 'Error changing password',
            text: 'Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }

  goToHome(): void {
    this.router.navigate(['/customer/home']);
  }
}