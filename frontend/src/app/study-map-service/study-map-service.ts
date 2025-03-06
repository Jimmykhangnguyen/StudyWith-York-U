import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudyMapService {
  private studyAreaSource = new BehaviorSubject<number[]>([]); // Default value
  currentCoords = this.studyAreaSource.asObservable();

  changeData(studyAreaCoords: number[]) {
    this.studyAreaSource.next(studyAreaCoords);
  }
}