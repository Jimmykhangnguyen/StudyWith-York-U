import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { StudyAreaComponent } from './study-area/study-area.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'; // Add this import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, LoginComponent, StudyAreaComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
