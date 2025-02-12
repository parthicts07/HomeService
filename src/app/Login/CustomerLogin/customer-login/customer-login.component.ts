import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerLoginModel, CustomerSignUpModel } from 'src/app/Models/customerLogin.model';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit, OnDestroy {
  
  model: CustomerLoginModel;
  signUp: CustomerSignUpModel;
  private customerLoginSubs?: Subscription;
  private customerRegisterSubs?: Subscription;
 
  constructor(private login: LoginService, private router: Router) {
    this.model = {
      userName: '',
      password: ''
    };
 
    this.signUp = {
      userName: '',
      password: '',
      email: '',
      customerName: '',
      mobileNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    };
  }
 
  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp') as HTMLButtonElement;
    const signInButton = document.getElementById('signIn') as HTMLButtonElement;
    const container = document.getElementById('container') as HTMLDivElement;
 
    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });
 
      signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }

  // onFormSubmit(): void {
  //   console.log(this.model);
  //   this.customerLoginSubs = this.login.customerLogin(this.model)
  //     .subscribe({
  //       next: (response) => {
  //         if (response.success) {
  //           alert("Login success!");
  //           this.router.navigateByUrl('customer/home');
  //         } else {
  //           alert(response.message);
  //         }
  //       },
  //       error: (err) => {
  //         console.error("Error during login:", err);
  //         alert("Login failed. Please check your credentials.");
  //       }
  //     });
  // }

  onFormSubmit(): void {
    console.log(this.model);
    this.customerLoginSubs = this.login.customerLogin(this.model)
      .subscribe({
        next: (response) => {
          if (response.success) {
            Swal.fire({
              title: 'Login success!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigateByUrl('customer/home');
            });
          } else {
            Swal.fire({
              title: 'Login failed',
              text: response.message || 'Please check your credentials.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (err) => {
          console.error("Error during login:", err);
          Swal.fire({
            title: 'Login failed',
            text: 'Please check your credentials.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
  }

  errors:{ [key: string]:string } = {};

  isToched: {[key: string]: boolean } = {
    customerName: false,
    userName: false,
    email: false,
    password: false
  };

  handleTouch(field: string){
    this.isToched[field] = true;
    this.validateField(field);
  }

  validateField(field: string){
    switch(field){
      case 'userName':
        this.errors['userName'] = this.signUp.userName.trim() === '' ? 'Required' : '';
        break;
      case 'customerName':
        this.errors['customerName'] = this.signUp.customerName.trim() === '' ? 'Required' : '';
        break;
      case 'password':
        this.validatePassword();
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!this.signUp.email){
          this.errors['email'] = 'Required';
        }else if(!emailPattern.test(this.signUp.email)){
          this.errors['email'] = 'Invalid';
        }
        else{
          this.errors['email'] = 'valid';
          setTimeout(() => (this.errors['email'] = ''), 4500);
        }
        break;
    }
  }

  validatePassword() {
    if (!this.signUp.password){
      this.errors['password'] = 'Required';
    } else if (this.signUp.password.length < 8) {
      this.errors['password'] = 'Weak';
    } else if ( !/[A-Za-z]/.test(this.signUp.password) ||
                !/[0-9]/.test(this.signUp.password) ||
                !/[@#$%^&*]/.test(this.signUp.password)) {
      this.errors['password'] = 'Average';
    } else {
      this.errors['password'] = 'Strong';
      setTimeout(() => (this.errors['password'] = ''), 3000);
    }
  }

  // onSignUpSubmit() {
  //   const allField = Object.values(this.errors).every(err => err === '') &&
  //     this.signUp.userName && this.signUp.customerName && this.signUp.password && this.signUp.email;

  //   if (allField) {
  //     console.log(this.signUp);
  //     this.customerRegisterSubs = this.login.customerRegister(this.signUp)
  //       .subscribe({
  //         next: (response) => {
  //           if (response.success) {
  //             alert('Welcome to HomeService!');
  //           } else {
  //             alert(response.message);
  //           }
  //         },
  //         error: (err) => {
  //           console.error("Error during registration:", err);
  //           alert("Register failed. Please check your credentials.");
  //         }
  //       });
  //   } else {
  //     alert('Please fill the necessary fields');
  //   }
  // }

  onSignUpSubmit(): void {
    const allField = Object.values(this.errors).every(err => err === '') &&
      this.signUp.userName && this.signUp.customerName && this.signUp.password && this.signUp.email;
      console.log(this.signUp);
    if (allField) {
      console.log(this.signUp);
      this.customerRegisterSubs = this.login.customerRegister(this.signUp)
        .subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire({
                title: 'Welcome to HomeService!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              }).then(() => {
                location.reload(); 
              });
            } else {
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
              title: 'Register failed',
              text: 'Please check your credentials.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Incomplete Form',
        text: 'Please fill the necessary fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  ngOnDestroy(): void {
    this.customerLoginSubs?.unsubscribe();
    this.customerRegisterSubs?.unsubscribe();
  }

}
