import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional-ratings',
  templateUrl: './professional-ratings.component.html',
  styleUrls: ['./professional-ratings.component.css']
})
export class ProfessionalRatingsComponent {
  ratings: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('profToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if(!token){
      alert('Please login to access the dashboard');
      this.router.navigateByUrl('/login/professionalLogin');
    }
    this.http.get<{success: boolean, ratings?: any[], message?: string}>('https://localhost:7001/api/Professional/getRatings', {headers})
    .subscribe(
      (response) => {
        if(response.success){
          this.ratings = response.ratings || [];
          this.isLoading = false;
          console.log(this.ratings);
        }
      },
      (err) => {
        this.error = 'Failed to load ratings. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    );
  }
}
