import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  loggedInEmail: string | null = null;
  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loggedInEmail = localStorage.getItem('loggedInEmail');
    this.isLoading = false;
  }

  logout(): void {
    localStorage.removeItem('loggedInEmail');
    this.loggedInEmail = null;
  }

  onStudyAreasClick() {
    this.router.navigate(['/map']);
  }
}
