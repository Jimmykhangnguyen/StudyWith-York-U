import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private userEmailSource = new BehaviorSubject<string | null>(localStorage.getItem('userEmail'));
  currentUserEmail = this.userEmailSource.asObservable();
  
  login(email: string): void {
    localStorage.setItem('userEmail', email);
    this.userEmailSource.next(email);
  }

  logout(): void {
    localStorage.removeItem('userEmail');
    this.userEmailSource.next(null);
  }
}
