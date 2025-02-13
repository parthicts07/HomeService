import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cutomer-dashboard',
  templateUrl: './cutomer-dashboard.component.html',
  styleUrls: ['./cutomer-dashboard.component.css']
})
export class CutomerDashboardComponent {
  isCustomerHome: boolean = false;
  isCustomerPackage: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void{
    const token = localStorage.getItem('custToken');
    if(!token){
      alert("Please login to access the dashboard!");
      this.router.navigateByUrl('/login/customerLogin');
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCustomerHome = event.urlAfterRedirects === '/customer/home';
        this.isCustomerPackage = this.router.url.startsWith('/customer/packages'); 
      }
    });
  }
}
