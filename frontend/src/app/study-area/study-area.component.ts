import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudyMapService } from '../study-map-service/study-map-service';

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
    { name: 'Example1', averageUserRating: 3, chargingOutlets: true, totalCleanRatings: 4, accessible: true, totalLoudRatings: 3,
      location: { latitude: -79.50600, longitude: 43.77350,  }, totalBusyRatings: 2, opening: 8, closing: 22, distance: [0, 0] },
    { name: 'Example2', averageUserRating: 3, chargingOutlets: false, totalCleanRatings: 3, accessible: false, totalLoudRatings: 2,
      location: { latitude: -79.50308, longitude: 43.77161 }, totalBusyRatings: 3, opening: 7, closing: 20, distance: [0, 0] },
  ]; // Stub database
  filteredStudyAreas: any[] = [];
  selectedStudyArea: any = null;
  searchTerm: string = '';
  selectedCategory: filterCaterogy = { name: '', value: false };
  ratings: number[] = [0, 0];

  categories: filterCaterogy[] = [
    { name: 'Charging Outlets', value: true },
    { name: 'Cleanliness Rating', value: 5 },
    { name: 'Accessible', value: false },
    { name: 'Quiet', value: 3 },
    { name: 'Not Crowded', value: 0 },
    { name: 'Opening', value: false },
    { name: 'Good Ratings', value: 4 },
  ];

  constructor(private http: HttpClient, private studyMapService: StudyMapService) {}
  
  ngOnInit(): void {
    this.studyMapService.getData(); // Fetch data when component initializes
    this.studyMapService.currentData.subscribe(data => {
      this.studyAreas = data; // Subscribe to the data observable
      this.filteredStudyAreas = this.studyAreas; // Initialize filteredStudyAreas with all study areas
    });
  }

  onSelectStudyArea(studyArea: any): void {
    if (this.selectedStudyArea === studyArea) { // Unselected study space
      this.selectedStudyArea = null;
      this.studyMapService.changeData([]);
      this.studyMapService.changeFeedback(false);
      this.studyMapService.changeId('');
    } else { // Selected study space
      this.selectedStudyArea = studyArea;
      this.studyMapService.changeData([studyArea.location.latitude, studyArea.location.longitude]);
      this.studyMapService.changeFeedback(true);
      this.studyMapService.changeId(studyArea.id);
      this.getRatings(studyArea.id);
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
        this.filteredStudyAreas = this.studyAreas.filter(area => area.totalCleanRatings >= 3);
        break;
      case "Accessible":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.accessible === true);
        break;
      case "Quiet":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.totalLoudRatings < 3);
        break;
      case "Not Crowded":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.totalBusyRatings < 3);
        break;
      case "Opening":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.opening >= 7 && area.closing <= 20);
        break;
      case "Good Ratings":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.averageUserRating >= 3);
        break;
      default:
        console.warn("Unknown category:", category.name);
        break;
    }
  }
}
