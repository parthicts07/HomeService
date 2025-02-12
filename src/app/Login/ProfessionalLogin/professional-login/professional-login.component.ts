import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfessionalLoginMode, ProfessionalSignUpModel } from 'src/app/Models/professionalLogin.model';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professional-login',
  templateUrl: './professional-login.component.html',
  styleUrls: ['./professional-login.component.css']
})
export class ProfessionalLoginComponent implements OnDestroy {
  isRotated = false;
  loginForm: ProfessionalLoginMode;
  signupForm: ProfessionalSignUpModel;
  private loginSubs?: Subscription;

  errors: { [key: string]: string } = {};

  isTouched: { [key: string]: boolean } = {
    userName: false,
    password: false,
    professionalName: false,
    email: false,
    service: false,
    aadhaarCard: false
  };

  constructor(private service: LoginService, private router: Router) {
    this.loginForm = {
      userName: '',
      password: '',
    };

    this.signupForm = {
      userName: '',
      password: '',
      email: '',
      professionalName: '',
      mobileNumber: '',
      experienceYears: 0,
      bio: '',  
      skills: '',
      service: '', 
      nationality: '',
      aadhaarCard: '',
    };
  }

  toggleForm() {
    this.isRotated = !this.isRotated;
  }

  handleTouch(field: string) {
    this.isTouched[field] = true;
    this.validateField(field);
  }

  validateField(field: string) {
    switch (field) {
      case 'userName':
        this.errors['userName'] = this.signupForm.userName.trim() === '' ? 'Required' : '';
        break;
      case 'password':
        this.validatePassword();
        break;
      case 'professionalName':
        this.errors['professionalName'] = this.signupForm.professionalName.trim() === '' ? 'Required' : '';
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.signupForm.email) {
          this.errors['email'] = 'Required';
        } else if (!emailPattern.test(this.signupForm.email)) {
          this.errors['email'] = 'Invalid';
        } else {
          this.errors['email'] = 'Valid';
          setTimeout(() => (this.errors['email'] = ''), 4500);
        }
        break;
      case 'mobileNumber':
        this.errors['mobileNumber'] = this.signupForm.mobileNumber.trim() === '' ? 'Required' : '';
        break;
      case 'experienceYears':
        this.errors['experienceYears'] = this.signupForm.experienceYears <= 0 ? 'Invalid' : '';
        break;
      case 'bio':
        this.errors['bio'] = this.signupForm.bio.trim() === '' ? 'Required' : '';
        break;
      case 'skills':
        this.errors['skills'] = this.signupForm.skills.trim() === '' ? 'Required' : '';
        break;
      case 'service':
        this.errors['service'] = this.signupForm.service.trim() === '' ? 'Required' : '';
        break;
      case 'nationality':
        this.errors['nationality'] = this.signupForm.nationality.trim() === '' ? 'Required' : '';
        break;
      case 'aadhaarCard':
        const aadhaarPattern = /^\d{12}$/;
        if (!this.signupForm.aadhaarCard) {
          this.errors['aadhaarCard'] = 'Required';
        } else if (!aadhaarPattern.test(this.signupForm.aadhaarCard)) {
          this.errors['aadhaarCard'] = 'Invalid';
        } else {
          this.errors['aadhaarCard'] = 'Valid';
          setTimeout(() => (this.errors['aadhaarCard'] = ''), 4500);
        }
        break;
    }
  }

  validatePassword() {
    if (!this.signupForm.password) {
      this.errors['password'] = 'Required';
    } else if (this.signupForm.password.length < 8) {
      this.errors['password'] = 'Weak';
    } else if (!/[A-Za-z]/.test(this.signupForm.password) ||
               !/[0-9]/.test(this.signupForm.password) ||
               !/[@#$%^&*]/.test(this.signupForm.password)) {
      this.errors['password'] = 'Average';
    } else {
      this.errors['password'] = 'Strong';
      setTimeout(() => (this.errors['password'] = ''), 3000);
    }
  }

  onLogin(): void {
    console.log(this.loginForm);
    this.loginSubs = this.service.professionalLogin(this.loginForm)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            Swal.fire({
              title: 'Login success!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigateByUrl('professional/home');
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (err) => {
          console.error("Login error:", err);
          Swal.fire({
            title: 'Login failed',
            text: 'Please check your credentials.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
  }

  // onSignUp() {
  //   console.log(this.signupForm);
  //   const allFieldsValid = Object.values(this.errors).every(err => err === '') &&
  //       this.signupForm.userName && this.signupForm.password && this.signupForm.professionalName &&
  //       this.signupForm.email && this.signupForm.service && this.signupForm.aadhaarCard;

  //   if (allFieldsValid) {
  //       console.log(this.signupForm);
  //       this.service.professionalRegister(this.signupForm)
  //           .subscribe({
  //               next: (response) => {
  //                   alert('Account created successfully!');
  //                   this.router.navigateByUrl('/login/professionalLogin');
  //               },
  //               error: (err) => {
  //                   console.error("Error during registration:", err);
  //                   alert("Signup failed. Please check your details.");
  //               }
  //           });
  //   } else {
  //       alert('Please complete all required fields correctly.');
  //   }
  // }

  onSignUp(): void {
    console.log(this.signupForm);
    const allFieldsValid = Object.values(this.errors).every(err => err === '') &&
        this.signupForm.userName && this.signupForm.password && this.signupForm.professionalName &&
        this.signupForm.email && this.signupForm.service && this.signupForm.aadhaarCard;
  
    if (allFieldsValid) {
      console.log(this.signupForm);
      this.service.professionalRegister(this.signupForm)
        .subscribe({
          next: (response) => {
            if(response.success){
              Swal.fire({
                title: 'Account created successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              }).then(() => {
                // this.router.navigateByUrl('/login/professionalLogin');
                location.reload(); // Refresh the page
              });
            }
            else {
              Swal.fire({
                title: 'Signup failed',
                text: response.message || 'Please check your details.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          },
          error: (err) => {
            console.error("Error during registration:", err);
            Swal.fire({
              title: 'Signup failed',
              text: 'Please check your details.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Incomplete Form',
        text: 'Please complete all required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  ngOnDestroy(): void {
    this.loginSubs?.unsubscribe();
  }
}