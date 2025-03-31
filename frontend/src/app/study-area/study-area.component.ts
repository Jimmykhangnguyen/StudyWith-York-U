import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    { id: 'E1', name: 'Example 1', address: 'Fake Address 1', chargingOutlets: true, accessible: false, opening: 8, closing: 22,
      totalRating: 4, totalRatingCount: 1, totalBusyRating: 2, totalBusyCount: 1, totalCleanRating: 2, totalCleanCount: 1, totalLoudRating: 3, totalLoudCount: 1
    },
    { id: 'E2', name: 'Example 2', address: 'Fake Address 2', chargingOutlets: false, accessible: true, opening: 7, closing: 20,
      totalRating: 5, totalRatingCount: 2, totalBusyRating: 11, totalBusyCount: 3, totalCleanRating: 9, totalCleanCount: 2, totalLoudRating: 6, totalLoudCount: 2
    },
  ]; // Stub database
  filteredStudyAreas: any[] = [];
  selectedStudyArea: any = null;
  searchTerm: string = '';
  selectedCategory: filterCaterogy = { name: '', value: false };
  ratings: number[] = [0, 0];

  categories: filterCaterogy[] = [
    { name: 'None', value: 0 },
    { name: 'Good Ratings', value: 4 },
    { name: 'Open', value: false },
    { name: 'Charging Outlets', value: true },
    { name: 'Accessible', value: false },
    { name: 'Empty', value: 0 },
    { name: 'Clean', value: 5 },
    { name: 'Quiet', value: 3 }
  ];

  constructor(private http: HttpClient, private studyMapService: StudyMapService) {}
  
  ngOnInit(): void {
    this.studyMapService.getData(); // Fetch data when component initializes
    this.studyMapService.currentData.subscribe(data => {
      this.studyAreas = data.length == 0 ? this.studyAreas : data; // Subscribe to the data observable
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
      case "None":
        this.filteredStudyAreas = this.studyAreas.filter(() => true);
        break;
      case "Good Ratings":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.totalRating / (area.totalRatingCount) >= 3);
        break;
      case "Open":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.name !== 'First Student Centre' && area.name !== 'Bergeron Sandbox');
        break;
      case "Charging Outlets":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.chargingOutlets);
        break;
      case "Accessible":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.accessible);
        break;
      case "Empty":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.totalBusyRating / (area.totalBusyCount) < 3);
        break;
      case "Clean":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.totalCleanRating / (area.totalCleanCount) >= 3);
        break;
      case "Quiet":
        this.filteredStudyAreas = this.studyAreas.filter(area => area.totalLoudRating / (area.totalLoudCount) < 3);
        break;
      default:
        console.warn("Unknown category:", category.name);
        break;
    }
  }

  hardReset(studyAreas: any): void {
    studyAreas.forEach((area: any) => {
      this.studyMapService.resetRatings(area.id);
    });
  }
}
