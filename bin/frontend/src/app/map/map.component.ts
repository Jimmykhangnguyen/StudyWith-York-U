import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined; 
  style = 'mapbox://styles/jimmykhang/cm701v76n007w01qu16uy4vvu';

  ngOnInit() {
    this.map = new mapboxgl.Map({
       accessToken: environment.accessToken,
       container: 'map',
       style: this.style,
       zoom: 9,
       maxBounds: [[-79.51440, 43.76300], [-79.49500, 43.78147]],
     });
 }
}