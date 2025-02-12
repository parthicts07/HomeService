import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-professional-dashboard',
  templateUrl: './professional-dashboard.component.html',
  styleUrls: ['./professional-dashboard.component.css']
})
export class ProfessionalDashboardComponent {
  isProfessionalHome: boolean = false;
  // isCustomerPackage: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void{
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isProfessionalHome = event.url === '/professional/home';
        // this.isCustomerPackage = this.router.url.startsWith('/customer/packages'); 
      }
    });
  }
}