import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { StudyAreaComponent } from '../study-area/study-area.component';

@Component({
  selector: 'app-map-layout',
  standalone: true,
  imports: [CommonModule, MapComponent, StudyAreaComponent],
  templateUrl: './map-layout.component.html',
  styleUrl: './map-layout.component.css'
})
export class MapLayoutComponent {

}
