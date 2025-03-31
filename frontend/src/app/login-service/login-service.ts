import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private loggedInEmailSource = new BehaviorSubject<string | null>(localStorage.getItem('loggedInEmail'));
  currentLoggedInEmail = this.loggedInEmailSource.asObservable();
  
  login(email: string): void {
    localStorage.setItem('loggedInEmail', email);
    this.loggedInEmailSource.next(email);
  }

  logout(): void {
    localStorage.removeItem('loggedInEmail');
    this.loggedInEmailSource.next(null);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedInEmail') !== null;
  }
}
