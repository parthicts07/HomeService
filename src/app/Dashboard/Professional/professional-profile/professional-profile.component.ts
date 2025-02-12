import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.component.html',
  styleUrls: ['./professional-profile.component.css'],
})
export class ProfessionalProfileComponent implements OnInit {
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

  isEditing: boolean = false;
  isChangingPassword: boolean = false;
  isUpdatingProfilePicture: boolean = false;
  editProfileForm!: FormGroup;
  changePasswordForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('profToken');
    if(!token){
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('/login/professionalLogin');
    }
    this.fetchProfessionalProfile();
    this.initForms();
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
            this.editProfileForm.patchValue(this.profile);
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

  initForms(): void {
    this.editProfileForm = this.fb.group({
      professionalName: [this.profile.professionalName, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      mobileNumber: [this.profile.mobileNumber, Validators.required],
      experienceYears: [this.profile.experienceYears, Validators.required],
      bio: [this.profile.bio],
      skills: [this.profile.skills],
      service: [this.profile.service],
      nationality: [this.profile.nationality],
      aadhaarCard: [this.profile.aadhaarCard],
    });

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, this.validatePassword]],
      confirmNewPassword: ['', Validators.required],
    }, { validator: this.passwordsMatchValidator });
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

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;
    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  toggleEditForm(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editProfileForm.patchValue(this.profile);
    }
  }

  toggleChangePasswordForm(): void {
    this.isChangingPassword = !this.isChangingPassword;
  }

  toggleUpdateProfilePictureForm(): void {
    this.isUpdatingProfilePicture = !this.isUpdatingProfilePicture;
  }

  onSubmitEditProfile(): void {
    if (this.editProfileForm.invalid) {
      return;
    }
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = this.editProfileForm.value;
    console.log('Request Payload:', payload);
    this.http.put<{ success: boolean; message: string }>('https://localhost:7001/api/Professional/editProfile', payload, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            console.log('Profile updated successfully:', response.message);
            this.fetchProfessionalProfile();
            this.isEditing = false;
            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'success',
              title: response.message || 'Profile updated successfully.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          } else {
            console.error('Error updating profile:', response.message);
            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'error',
              title: response.message || 'Error updating profile.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating profile:', error);
          if (error.status === 400 && error.error.errors) {
            const validationErrors = error.error.errors;
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                const formControl = this.editProfileForm.get(key);
                if (formControl) {
                  formControl.setErrors({ serverError: validationErrors[key] });
                }
              }
            }
          }
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: 'Error updating profile. Please check the form for errors.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      );
  }

  onSubmitChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = this.changePasswordForm.value;
    console.log('Request Payload:', payload);
    this.http.put<{ success: boolean; message: string }>('https://localhost:7001/api/Professional/changePassword', payload, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            console.log('Password changed successfully:', response.message);
            this.isChangingPassword = false;
            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'success',
              title: response.message || 'Password changed successfully.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          } else {
            console.error('Error changing password:', response.message);
            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'error',
              title: response.message || 'Error changing password.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error changing password:', error);
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: error.status === 403 ? 'You do not have permission to change the password. Please contact the administrator.' : 'Error changing password. Please try again later.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      );
  }

  onSubmitUpdateProfilePicture(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.put<{ success: boolean; message: string }>('https://localhost:7001/api/Professional/uploadProfilePicture', formData, { headers })
        .subscribe(
          (response) => {
            if (response.success) {
              console.log('Profile picture updated successfully:', response.message);
              this.isUpdatingProfilePicture = false;
              this.fetchProfessionalProfile();
              Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'success',
                title: response.message || 'Profile picture updated successfully.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
            } else {
              console.error('Error updating profile picture:', response.message);
              Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: response.message || 'Error updating profile picture.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
            }
          },
          (error) => {
            console.error('Error updating profile picture:', error);
            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'error',
              title: 'Error updating profile picture. Please try again later.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  goToHome(): void {
    this.router.navigate(['/professional/home']);
  }
}