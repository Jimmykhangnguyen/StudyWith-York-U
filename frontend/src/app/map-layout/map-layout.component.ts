import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { StudyAreaComponent } from '../study-area/study-area.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-map-layout',
  standalone: true,
  imports: [CommonModule, MapComponent, StudyAreaComponent, NavBarComponent, HttpClientModule],
  templateUrl: './map-layout.component.html',
  styleUrl: './map-layout.component.css'
})
export class MapLayoutComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {}, 100);
  }
}
