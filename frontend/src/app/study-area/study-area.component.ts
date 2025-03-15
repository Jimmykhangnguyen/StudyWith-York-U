import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudyMapService } from '../study-map-service/study-map-service';
import { response } from 'express';

interface filterCaterogy {
  name: string;
  value: boolean | number;
}

@Component({
  selector: 'app-study-area',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './study-area.component.html',
  styleUrls: ['./study-area.component.css']
})

export class StudyAreaComponent implements OnInit {
  studyAreas = [
    { name: 'Example1', chargingOutlets: true, cleanlinessRating: 4, accessible: true, loudness: 3,
      location: { latitude: -79.50600, longitude: 43.77350,  }, business: 2, opening: 8, closing: 22 },
    { name: 'Example2', chargingOutlets: false, cleanlinessRating: 3, accessible: false, loudness: 2,
      location: { latitude: -79.50308, longitude: 43.77161 }, business: 3, opening: 7, closing: 20 },
  ]; // Stub database
  filteredStudyAreas: any[] = [];
  selectedStudyArea: any = null;
  isSlidingOut: boolean = false;
  searchTerm: string = '';
  selectedCategory: filterCaterogy = { name: '', value: false };
  ratings: number[] = [0, 0];

  categories: filterCaterogy[] = [
    { name: 'Charging Outlets', value: true },
    { name: 'Cleanliness Rating', value: 5 },
    { name: 'Accessible', value: false },
    { name: 'Loudness', value: 3 },
    { name: 'Business', value: 0 },
    { name: 'Opening', value: false }
  ];

  constructor(private http: HttpClient, private studyMapService: StudyMapService) {}

  ngOnInit(): void {
    this.filteredStudyAreas = this.studyAreas; // Initialize filteredStudyAreas with all study areas
    this.http.get<{ _embedded: { studyAreas: any[] } }>('http://localhost:8080/studyAreas')
      .subscribe(response => {
        this.studyAreas = response._embedded?.studyAreas ?? "no Study areas!";
        this.filteredStudyAreas = this.studyAreas; // Update filteredStudyAreas after fetching data
      });
  }

  onSelectStudyArea(studyArea: any): void {
    if (this.selectedStudyArea === studyArea) { // Unselected study space
      // Trigger slide-out animation
      this.isSlidingOut = true;
      // Wait for the animation to complete before deselecting
      setTimeout(() => {
        this.selectedStudyArea = null;
        this.isSlidingOut = false;
      }, 500); // Match the duration of the slideOut animation
      this.studyMapService.changeData([]);
    } else { // Selected study space
      this.selectedStudyArea = studyArea;
      this.getRatings(studyArea._links.self.href.split('/').pop());
      this.isSlidingOut = false;
      this.studyMapService.changeData([studyArea.location.latitude, studyArea.location.longitude]);
    }
  }

  filterStudyAreas() {
    this.filteredStudyAreas = this.studyAreas.filter((area: any) =>
      area.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  rateStudyArea(studyAreaId: string, rating: number): void {
    this.http.post(`http://localhost:8080/ratings?id=${studyAreaId}&rating=${rating}`, null)
      .subscribe(response => {
        console.log('Successfully rated study area:', response);
        this.getRatings(studyAreaId);
      }, error => {
        console.error('Failed to rate study area:', error);
      });
  }

  getRatings(studyAreaId: string): void {
    this.http.get<number[]>(`http://localhost:8080/ratings?id=${studyAreaId}`)
      .subscribe(response => {
        this.ratings = response; 
        console.log('Fetched ratings:', this.ratings);
      }, error => {
        console.error('Failed to fetch ratings:', error);
      });
  }
  
  filterByCategory(category: filterCaterogy): void {
    switch (category.name) {
      case "Charging Outlets":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.chargingOutlets === true);
        break;
  
      case "Cleanliness Rating":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.cleanlinessRating >= 3);
        break;
  
      case "Accessible":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.accessible === true);
        break;
  
      case "Loudness":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.loudness <= 3);
        break;
  
      case "Business":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.business <= 3);
        break;
  
      case "Opening":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.opening >= 7 && area.closing <= 20);
        break;
  
      default:
        console.warn("Unknown category:", category.name);
        break;
    }
  }
  
  

}