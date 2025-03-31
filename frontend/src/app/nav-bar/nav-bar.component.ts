import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login-service/login-service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  loggedInEmail: string | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentLoggedInEmail.subscribe(email => {
      this.loggedInEmail = email;
    });
  }

  logout(): void {
    this.loginService.logout();
  }
}
