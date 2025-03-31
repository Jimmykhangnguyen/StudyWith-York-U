import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login-service/login-service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  loggedInEmail: string | null = null;
  showPopup: boolean = false;

  constructor(private http: HttpClient, private loginService: LoginService) {};

  ngOnInit(): void {
    this.loginService.currentLoggedInEmail.subscribe(email => {
      this.loggedInEmail = email;
    });
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }
}
