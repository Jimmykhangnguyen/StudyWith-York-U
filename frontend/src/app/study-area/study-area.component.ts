import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface filterCaterogy {
  name: string;
  value: boolean;
}

@Component({
  selector: 'app-study-area',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule], // Add FormsModule here
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

  categories: filterCaterogy[] = [
    { name: 'Charging Outlets', value: false },
    { name: 'Cleanliness Rating', value: false },
    { name: 'Accessible', value: false },
    { name: 'Loudness', value: false },
    { name: 'Business', value: false },
    { name: 'Opening', value: false }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.filteredStudyAreas = this.studyAreas; // Initialize filteredStudyAreas with all study areas
    this.http.get<{ _embedded: { studyAreas: any[] } }>('http://localhost:8080/studyAreas')
      .subscribe(response => {
        this.studyAreas = response._embedded?.studyAreas ?? "no Study areas!";
        this.filteredStudyAreas = this.studyAreas; // Update filteredStudyAreas after fetching data
      });
  }

  onSelectStudyArea(area: any) {
    this.selectedStudyArea = this.selectedStudyArea === area ? null : area;
  }

  filterStudyAreas() {
    this.filteredStudyAreas = this.studyAreas.filter((area: any) =>
      area.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}