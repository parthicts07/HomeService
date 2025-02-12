import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CustomerLoginModel, CustomerLoginResponse, CustomerRegisterResponse, CustomerSignUpModel } from '../Models/customerLogin.model';
import { ProfessionalLoginMode, ProfessionalLoginResponse, ProfessionalRegisterResponse, ProfessionalSignUpModel } from '../Models/professionalLogin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'https://localhost:7001/api/Customer/login';
  private registerUrl = 'https://localhost:7001/api/Customer/register';
  private proflogin = 'https://localhost:7001/api/Professional/login';
  private profregister = 'https://localhost:7001/api/Professional/Register'

  constructor(private http: HttpClient) { }

  customerLogin(model: CustomerLoginModel): Observable<CustomerLoginResponse> {
    return this.http.post<CustomerLoginResponse>(this.loginUrl, model)
      .pipe(
        tap((response: CustomerLoginResponse) => {
          if (response.success && response.token) {
            localStorage.setItem('custToken', response.token);
          } else {
            console.error("Login failed:", response.message);
          }
        })
      );
  }

  customerRegister(model: CustomerSignUpModel): Observable<CustomerRegisterResponse> {
    return this.http.post<CustomerRegisterResponse>(this.registerUrl, model);
  }

  professionalLogin(model: ProfessionalLoginMode): Observable<ProfessionalLoginResponse> { 
    return this.http.post<ProfessionalLoginResponse>(this.proflogin, model) 
      .pipe(
        tap((response: ProfessionalLoginResponse) => { 
          if (response && response.token) { 
            localStorage.setItem('profToken', response.token); 
          } else {
            console.error("Token not received in response", response);
          }
        })
      );
  }

  professionalRegister(model: ProfessionalSignUpModel): Observable<ProfessionalRegisterResponse>{
    return this.http.post<ProfessionalRegisterResponse>(this.profregister, model);
  }
}
