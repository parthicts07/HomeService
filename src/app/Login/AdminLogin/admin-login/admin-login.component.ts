import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  userName: string = '';
  password: string = '';
  mobileNumber: string = '';
  otp: string = '';
  captcha: string = '';
  enteredCaptcha: string = '';
  token:string='';
 
  constructor(private http: HttpClient, private router: Router) {}
 
  // onLoginSubmit() {
  //   const loginData = {
  //     userName: this.userName,
  //     password: this.password,
  //     mobileNumber: this.mobileNumber
  //   };
 
  //   this.http.post('https://localhost:7001/api/Admin/login', loginData, { 
  //     responseType: 'text', 
  //     withCredentials: true 
  //   }).subscribe(
  //     response => {
  //       console.log(response);
  //       this.showCaptcha();
  //       this.generateCaptcha(); 
  //     },
  //     error => {
  //       console.error('Login failed', error);
  //       alert('Login failed: ' + error.error);
  //     }
  //   );
  // }

  onLoginSubmit(): void {
    const loginData = {
      userName: this.userName,
      password: this.password,
      mobileNumber: this.mobileNumber
    };
  
    this.http.post('https://localhost:7001/api/Admin/login', loginData, { 
      responseType: 'text', 
      withCredentials: true 
    }).subscribe(
      response => {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse.success) {
          Swal.fire({
            title: 'OTP sent to your mobile number!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.showCaptcha();
            this.generateCaptcha();
          });
        } else {
          Swal.fire({
            title: 'Login failed',
            text: parsedResponse.message || 'Please check your credentials.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error => {
        console.error('Login failed', error);
        Swal.fire({
          title: 'Login failed',
          text: 'Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
 
  showCaptcha() {
    const loginForm = document.getElementById('loginForm');
    const captchaForm = document.getElementById('captchaForm');
 
    if (loginForm && captchaForm) {
      loginForm.style.display = 'none';
      captchaForm.style.display = 'block';
    } else {
      console.error('Form elements not found');
    }
  }
 
  generateCaptcha() {
    this.http.get('https://localhost:7001/api/Admin/generateCaptcha', { 
      responseType: 'text', 
      withCredentials: true 
    }).subscribe(
      response => {
        this.captcha = response;
      },
      error => {
        console.error('Captcha generation failed', error);
        alert('Failed to generate captcha. Please try again.');
      }
    );
  }
 
  // onCaptchaSubmit() {
  //   const otpData = {
  //     captcha: this.enteredCaptcha,
  //     otp: this.otp
  //   };
 
  //   this.http.post('https://localhost:7001/api/Admin/verifyOtp', otpData, { 
  //     withCredentials: true 
  //   }).subscribe(
  //     (response: any) => {
  //       alert('OTP verified successfully! Redirecting...');
  //       localStorage.setItem('adminToken', response.token); 
  //       this.router.navigateByUrl('admin/Home');
  //     },
  //     error => {
  //       console.error('OTP verification failed', error);
  //       alert('OTP verification failed: ' + (error.error || 'Unknown error'));
  //     }
  //   );
  // }

  onCaptchaSubmit(): void {
    const otpData = {
      captcha: this.enteredCaptcha,
      otp: this.otp
    };
  
    this.http.post('https://localhost:7001/api/Admin/verifyOtp', otpData, { 
      withCredentials: true 
    }).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'OTP verified successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          localStorage.setItem('adminToken', response.token); 
          this.router.navigateByUrl('admin/home');
        });
      },
      error => {
        console.error('OTP verification failed', error);
        Swal.fire({
          title: 'OTP verification failed',
          text: error.error || 'Unknown error',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
}