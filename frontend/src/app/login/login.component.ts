import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Router } from '@angular/router';  // Import Router to make page transitions

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

  //use a router to make transitions between pages
  constructor(private router: Router) {}

  // When login button is clicked move to 'map'
  onSubmit() {
    // For demo, assume login is always successful to redirect to the map
    this.router.navigate(['/map']);  
  }
}
