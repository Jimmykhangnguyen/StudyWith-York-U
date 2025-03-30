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

  private dataSource = new BehaviorSubject<any[]>([]);
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient) {} // Inject HttpClient
  
  getData() {
    this.http.get('http://localhost:8080/study_areas').subscribe((data: any) => {
      this.dataSource.next(data);
    }, (error) => {
      console.error('Failed to fetch data:', error.message);
      alert('Failed to fetch data. Please try again later.');
    });
  }

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
    this.http.post(
      `http://localhost:8080/ratings?id=${studyAreaId}&rating=${rating}`,
      null,
      { responseType: 'text' }
    ).subscribe({
      next: (response) => {
        console.log('Successfully rated study area:', response);
      },
      error: (error) => {
        console.error('Failed to rate study area:', error.message);
        alert('Failed to submit rating. Please try again later.');
      }
    });
  }

  rateBusyness(studyAreaId: string, rating: number): void {
    this.http.post(
      `http://localhost:8080/ratings/busyness?id=${studyAreaId}&rating=${rating}`,
      null,
      { responseType: 'text' }
    ).subscribe({
      next: (response) => {
        console.log('Successfully rated busyness:', response);
      },
      error: (error) => {
        console.error('Failed to rate busyness:', error.message);
        alert('Failed to submit busyness rating. Please try again later.');
      }
    });
  }

  rateLoudness(studyAreaId: string, rating: number): void {
    this.http.post(
      `http://localhost:8080/ratings/loudness?id=${studyAreaId}&rating=${rating}`,
      null,
      { responseType: 'text' }
    ).subscribe({
      next: (response) => {
        console.log('Successfully rated loudness:', response);
      },
      error: (error) => {
        console.error('Failed to rate loudness:', error.message);
        alert('Failed to submit loudness rating. Please try again later.');
      }
    });
  }

  rateCleanliness(studyAreaId: string, rating: number): void {
    this.http.post(
      `http://localhost:8080/ratings/cleanliness?id=${studyAreaId}&rating=${rating}`,
      null,
      { responseType: 'text' }
    ).subscribe({
      next: (response) => {
        console.log('Successfully rated cleanliness:', response);
      },
      error: (error) => {
        console.error('Failed to rate cleanliness:', error.message);
        alert('Failed to submit cleanliness rating. Please try again later.');
      }
    });
  }
}
