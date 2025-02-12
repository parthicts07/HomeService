import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional-navbar',
  templateUrl: './professional-navbar.component.html',
  styleUrls: ['./professional-navbar.component.css']
})
export class ProfessionalNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {  }

  logout(){
    localStorage.removeItem('profToken');
    this.router.navigateByUrl('/'); 
  }
}