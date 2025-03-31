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
  userEmail: string | null = null;
  userFavourites: string[] = [];
  userNumFavourites: number = 0;
  showPopup: boolean = false;

  constructor(private http: HttpClient, private loginService: LoginService) {};

  ngOnInit(): void {
    this.loginService.currentUserEmail.subscribe(email => {
      this.userEmail = email;
    });
    this.getUserFavourites();
    this.getUserNumFavourites();
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  getUserFavourites(): void {
    this.http.get(`http://localhost:8080/favourites?email=${this.userEmail}`)
      .subscribe((response: any) => {
        this.userFavourites = response; 
        console.log('Fetched user favourites:', this.userFavourites);
      }, error => {
        console.error('Failed to fetch user favourites:', error);
      });
  }

  getUserNumFavourites(): void {
    this.http.get(`http://localhost:8080/numFavourites?email=${this.userEmail}`)
      .subscribe((response: any) => {
        this.userNumFavourites = response; 
        console.log('Fetched user num favourites:', this.userNumFavourites);
      }, error => {
        console.error('Failed to fetch user num favourites:', error);
      });
  }

  addFavourite(studyAreaId: string): void {
    this.http.post(`http://localhost:8080/favourites?id=${studyAreaId}&email=${this.userEmail}`, null)
      .subscribe(response => {
        console.log('Successfully added favourite:', response);
      }, error => {
        this.getUserFavourites();
        this.getUserNumFavourites();
        // console.error('Failed to add favourite:', error);
      });
  }

  resetFavourites(): void {
    this.http.post(`http://localhost:8080/favourites/reset?email=${this.userEmail}`, null)
      .subscribe(response => {
        console.log('Successfully reseted favourites:', response);
      }, error => {
        this.getUserFavourites();
        this.getUserNumFavourites();
        // console.error('Failed to reset favourites:', error);
      });
  }
}
