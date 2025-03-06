import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudyMapService } from '../study-map-service/study-map-service';

interface filterCaterogy {
  name: string;
  value: boolean;
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
      location: { longitude: -79.50600, latitude: 43.77350 }, business: 2, opening: 8, closing: 22 },
    { name: 'Example2', chargingOutlets: false, cleanlinessRating: 3, accessible: false, loudness: 2,
      location: { longitude: -79.50308, latitude: 43.77161 }, business: 3, opening: 7, closing: 20 },
  ]; // Stub database
  filteredStudyAreas: any[] = [];
  selectedStudyArea: any = null;
  isSlidingOut: boolean = false;
  searchTerm: string = '';

  categories: filterCaterogy[] = [
    { name: 'Charging Outlets', value: false },
    { name: 'Cleanliness Rating', value: false },
    { name: 'Accessible', value: false },
    { name: 'Loudness', value: false },
    { name: 'Business', value: false },
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
      this.isSlidingOut = false;
      this.studyMapService.changeData([studyArea.location.longitude, studyArea.location.latitude]);
    }
  }

  filterStudyAreas(): void {
    this.filteredStudyAreas = this.studyAreas.filter(area =>
      area.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}