import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-reviews-layout',
  standalone: true,
  imports: [NavBarComponent, ReviewsComponent],
  templateUrl: './reviews-layout.component.html',
  styleUrl: './reviews-layout.component.css'
})

export class ReviewsLayoutComponent {

}
