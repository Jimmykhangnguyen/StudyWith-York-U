import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login-service/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  errorMessage: string = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) {}

  // When login button is clicked, move to 'map'
  // map includes (study area, map and navBar components in map-layout component)
  onLoginSubmit() {
    console.log('Form Submitted');
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/login', loginData, {
      headers: this.httpOptions.headers,
      responseType: 'text' // messages from database: Login successful, User not found, Invalid credentials
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response === 'Login successful') {
          this.loginService.login(this.email);
          this.router.navigate(['/map']);
        } else {
          this.errorMessage = 'Error';
          this.loginError = true;
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error || 'Invalid email or password. Please try again.';
        this.loginError = true;
      }
    });
  }

  registerRoute() {
    this.router.navigate(['/register']);
  }
}
