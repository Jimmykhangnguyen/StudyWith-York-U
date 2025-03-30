import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudyMapService {
  private studyAreaSource = new BehaviorSubject<number[]>([]);
  currentCoords = this.studyAreaSource.asObservable();

  private feedbackSource = new BehaviorSubject<boolean>(false);
  currentFeedback = this.feedbackSource.asObservable();

  private idSource = new BehaviorSubject<string>("");
  currentId = this.idSource.asObservable();

  constructor(private http: HttpClient) {} // Inject HttpClient

  changeData(studyAreaCoords: number[]) {
    this.studyAreaSource.next(studyAreaCoords);
  }

  changeFeedback(showFeedback: boolean) {
    console.log('Changing feedback state to:', showFeedback); // Debug log
    this.feedbackSource.next(showFeedback);
  }

  changeId(studyAreaId: string) {
    console.log('Changing ID state to:', studyAreaId); // Debug log
    this.idSource.next(studyAreaId);
  }

  rateStudyArea(studyAreaId: string, rating: number): void {
    this.http.post<{ message: string }>(
      `http://localhost:8080/ratings?id=${studyAreaId}&rating=${rating}`,
      null
    ).subscribe({
      next: (response) => {
        console.log('Successfully rated study area:', response.message);
      },
      error: (error) => {
        console.error('Failed to rate study area:', error);
        alert('Failed to submit rating. Please try again later.');
      }
    });
  }
}
