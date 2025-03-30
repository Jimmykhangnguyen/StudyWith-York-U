import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  registerError: boolean = false;
  errorMessage: string = '';
  enterPassword: string = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private router: Router, private http: HttpClient) {}

  loginRoute() {
    this.router.navigate(['/login']);
  }

  // When register button on login is clicked, move to 'register'
  //map includes (study area, mao and navBar compoennts in msp-layout component)
  async onRegisterSubmit() {

    //validate the password in front end so and make user re type password for further validation
    if (!this.validPasswordCheck(this.password)) {
      this.errorMessage = "Password must be 8-20 characters long, one uppercase letter and at least one number.";
      this.registerError = true;
      return;
    }
    try {
      const isUnique = await this.checkEmailUnique(this.email);
      if (!isUnique) {
        this.errorMessage = "Email is already in use or invalid email. Please use a different email.";
        this.registerError = true;
        return;
      }
    } catch (error) {
      console.error("Error checking email", error);
      this.errorMessage = "Error checking email. Please try again later.";
      this.registerError = true;
      return;
    }

    if (this.password !== this.enterPassword) {
      this.errorMessage = "Passwords do not match. Please try again";
      this.registerError = true;
      return;
    }

    console.log('Form Submitted');
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/register', registerData, {
  headers: this.httpOptions.headers,
  responseType: 'text' 
}).subscribe({
  next: (response) => {
    console.log('Register successful:', response);
    this.errorMessage = "Registration succseful. Please Log in.";
  },
  error: (error) => {
    console.error('Register error:', error);
    this.errorMessage = error.error || 'Registration failed. Please try again.';
    this.registerError = true;
  }
});
  }


  //password validation
  validPasswordCheck(password: string): boolean {
      return password.length >= 8 && password.length <= 20 && 
      /[A-Z]/.test(password) && /[0-9]/.test(password);
  }

  // Email uniqueness check by calling backend endpoint "check-email" with the email user inputs
  checkEmailUnique(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<boolean>(`http://localhost:8080/check-email?email=${email}`).subscribe({
        next: (response) => resolve(response), 
        error: (error) => reject(error)
      });
    });
  }
}