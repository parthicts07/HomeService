import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css']
})
export class CustomerNavbarComponent implements OnInit {
  constructor(private router: Router) {} 
  isHome: boolean = false;
  
  ngOnInit() {
    const token = localStorage.getItem('custToken');
    if (!token) {
      alert('token not found');
      this.router.navigateByUrl('login/customerLogin'); 
    } else {
      console.log("Token found:")
    }
  }
  
  logout(){
    localStorage.removeItem('custToken');
    this.router.navigateByUrl('/'); 
  }
}
