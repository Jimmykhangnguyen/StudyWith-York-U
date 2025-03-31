import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login-service/login-service';
import { StudyMapService } from '../study-map-service/study-map-service';
import { stubDatabase } from '../stub-database/stub-database';

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
  studyAreas: any = stubDatabase.studyAreas;
  nonFavouriteStudyAreas: any[] = [];
  showPopup: boolean = false;

  constructor(private http: HttpClient, private loginService: LoginService, private studyMapService: StudyMapService) {};

  ngOnInit(): void {
    this.loginService.currentUserEmail.subscribe(email => {
      this.userEmail = email;
    });
    this.updateUserFavouritesInfo();
    this.studyMapService.getData();
    this.studyMapService.currentStudyData.subscribe(data => {
      this.studyAreas = data.length == 0 ? this.studyAreas : data; // Subscribe to the data observable
      setTimeout(() => this.filterStudyAreas(), 200); // Initialize filteredStudyAreas with non-favourite study areas
    });
  }

  areaFromId(studyAreaId: string): any {
    return this.studyAreas.find((area: any) => area.id === studyAreaId);
  }

  updateUserFavouritesInfo(): void {
    this.http.get(`http://localhost:8080/favourites?email=${this.userEmail}`)
      .subscribe((response: any) => {
        this.userFavourites = response; 
        console.log('Fetched user favourites:', this.userFavourites);
      }, error => {
        console.error('Failed to fetch user favourites:', error);
      });
      this.http.get(`http://localhost:8080/numFavourites?email=${this.userEmail}`)
      .subscribe((response: any) => {
        this.userNumFavourites = response; 
        console.log('Fetched user num favourites:', this.userNumFavourites);
      }, error => {
        console.error('Failed to fetch user num favourites:', error);
      });
  }

  filterStudyAreas(): void {
    this.nonFavouriteStudyAreas = this.studyAreas.filter((area: any) => !this.userFavourites.includes(area.id));
    console.log('Filtered non-favourite study areas.', this.nonFavouriteStudyAreas);
  }

  addFavourite(studyAreaId: string): void {
    this.http.post(`http://localhost:8080/favourites?id=${studyAreaId}&email=${this.userEmail}`, null)
      .subscribe(response => {
        console.log('Successfully added favourite:', response);
      }, error => {
        this.updateUserFavouritesInfo();
        setTimeout(() => this.filterStudyAreas(), 200);
        // console.error('Failed to add favourite:', error);
      });
  }

  resetFavourites(): void {
    this.http.post(`http://localhost:8080/favourites/reset?email=${this.userEmail}`, null)
      .subscribe(response => {
        console.log('Successfully reseted favourites:', response);
      }, error => {
        this.updateUserFavouritesInfo();
        setTimeout(() => this.filterStudyAreas(), 200);
        // console.error('Failed to reset favourites:', error);
      });
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }
}
