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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCustomerHome = event.urlAfterRedirects === '/customer/home';
        this.isCustomerPackage = this.router.url.startsWith('/customer/packages'); 
      }
    });
  }
}
