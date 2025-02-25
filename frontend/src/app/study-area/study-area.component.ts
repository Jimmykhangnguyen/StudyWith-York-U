import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-study-area',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './study-area.component.html',
  styleUrls: ['./study-area.component.css']
})
export class StudyAreaComponent implements OnInit {
  studyAreas = [
    { name: 'Example1', chargingOutlets: true, cleanlinessRating: 4, accessible: true, loudness: 3, business: 2, opening: 8, closing: 22 },
    { name: 'Example2', chargingOutlets: false, cleanlinessRating: 3, accessible: false, loudness: 2, business: 3, opening: 7, closing: 20 },
  ];
  filteredStudyAreas: any[] = []; // Array to hold filtered study areas
  selectedStudyArea: any = null;
  isSlidingOut: boolean = false;
  searchTerm: string = ''; // Property to hold the search term

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.filteredStudyAreas = this.studyAreas; // Initialize filteredStudyAreas with all study areas
    this.http.get<{ _embedded: { studyAreas: any[] } }>('http://localhost:8080/studyAreas')
      .subscribe(response => {
        this.studyAreas = response._embedded?.studyAreas ?? "no Study areas!";
        this.filteredStudyAreas = this.studyAreas; // Update filteredStudyAreas after fetching data
      });
  }

  onSelectStudyArea(studyArea: any): void {
    if (this.selectedStudyArea === studyArea) {
      // Trigger slide-out animation
      this.isSlidingOut = true;
      // Wait for the animation to complete before deselecting
      setTimeout(() => {
        this.selectedStudyArea = null;
        this.isSlidingOut = false;
      }, 500); // Match the duration of the slideOut animation
    } else {
      this.selectedStudyArea = studyArea;
      this.isSlidingOut = false;
    }
  }

  filterStudyAreas(): void {
    this.filteredStudyAreas = this.studyAreas.filter(area =>
      area.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}