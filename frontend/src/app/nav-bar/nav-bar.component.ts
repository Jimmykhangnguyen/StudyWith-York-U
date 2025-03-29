import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {
  constructor(private router: Router) {}

  onStudyAreasClick() {
    this.router.navigate(['/map']).then(() => {
      location.reload();
    });
  }
}
