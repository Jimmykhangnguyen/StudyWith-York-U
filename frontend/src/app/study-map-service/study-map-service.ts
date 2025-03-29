import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyMapService {
  private studyAreaSource = new BehaviorSubject<number[]>([]);
  currentCoords = this.studyAreaSource.asObservable();

  private feedbackSource = new BehaviorSubject<boolean>(false);
  currentFeedback = this.feedbackSource.asObservable();

  changeData(studyAreaCoords: number[]) {
    this.studyAreaSource.next(studyAreaCoords);
  }

  changeFeedback(showFeedback: boolean) {
    console.log('Changing feedback state to:', showFeedback); // Debug log
    this.feedbackSource.next(showFeedback);
  }
}
