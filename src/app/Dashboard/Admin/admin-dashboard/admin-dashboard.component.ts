import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isAdminHome: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void{
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminHome = event.urlAfterRedirects === '/admin/home';
      }
    });
  }
}
