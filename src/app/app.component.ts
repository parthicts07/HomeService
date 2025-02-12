import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeService';
  isAbout: boolean = false;
  isLoginRoute: boolean = false;
  isAdminRoute: boolean = false;
  isCustomerRoute: boolean = false;
  isProfessionalRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAbout = event.url == '/about';
        this.isLoginRoute = this.router.url.startsWith('/login');
        this.isAdminRoute = this.router.url.startsWith('/admin/'); 
        this.isCustomerRoute = this.router.url.startsWith('/customer/');
        this.isProfessionalRoute = this.router.url.startsWith('/professional/'); 
      }
    });
  }
}