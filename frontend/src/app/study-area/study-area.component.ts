import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-study-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study-area.component.html',
  styleUrls: ['./study-area.component.css']
})
export class StudyAreaComponent implements OnInit {
  studyAreas = [
    { name: 'Example1', chargingOutlets: true, cleanlinessRating: 4, accessible: true, loudness: 3, business: 2, opening: 8, closing: 22 },
    { name: 'Example2', chargingOutlets: false, cleanlinessRating: 3, accessible: false, loudness: 2, business: 3, opening: 7, closing: 20 },
  ];
  selectedStudyArea: any = null; // will have study area details when clicked.

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //link to database study area collection is http://localhost:8080/studyAreas
    //Fetch study areas from database, by using GET request to interpret the body of JSON
    this.http.get<{ _embedded: { studyAreas: any[] } }>('http://localhost:8080/studyAreas')
  .subscribe(response => {
    this.studyAreas = response._embedded?.studyAreas ?? "no Study areas!"; // if there is a response extracts all studyAreas, else display error message 
  });

  }
  // When a user clicks on a study area, html argument get passed and selectedStudyArea gets updated
  onSelectStudyArea(studyArea: any): void {
    this.selectedStudyArea = studyArea;
  }
}
