import { Component, AfterViewChecked, ElementRef, ViewChild, NgZone, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewChecked, AfterViewInit {
  @ViewChild('introCarousel', { static: false }) introCarousel: ElementRef | undefined;

  slides = [
    { image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(130).jpg', title: 'Learn Bootstrap 5 with MDB', description: 'Best & free guide of responsive web design', buttonText: 'Start tutorial', buttonLink: 'https://www.youtube.com/watch?v=c9B4TPnak1A' },
    { image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(129).jpg', title: 'You can place here any content', description: '' },
    { image: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(70).jpg', title: 'And cover it with any mask', description: 'Learn about masks', buttonText: 'Learn about masks', buttonLink: 'https://mdbootstrap.com/docs/standard/content-styles/masks/' }
  ];

  private carouselInitialized = false;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.tryInitializeCarousel();
  }

  ngAfterViewChecked(): void {
    this.tryInitializeCarousel();
  }

  private tryInitializeCarousel() {
    if (this.introCarousel && !this.carouselInitialized) {
      this.initializeCarousel();
    }
  }

  private initializeCarousel() {
    if (this.introCarousel) { 
      const carousel = this.introCarousel.nativeElement;
      this.ngZone.runOutsideAngular(() => {
        try {
          new (<any>window).mdb.Carousel(carousel);
          console.log("Carousel initialized");
          this.carouselInitialized = true;
        } catch (error) {
          console.error("Carousel initialization error:", error);
        }
      });
    }
  }
}