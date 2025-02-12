import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../Models/customer.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getPackageById(serviceId:string): Observable<Package[]>{
    return this.http.get<Package[]>(`https://localhost:7001/api/Customer/getPackagesByServiceId/${serviceId}`);
  }
}
