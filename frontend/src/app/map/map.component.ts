import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from './../../environments/environment';
import { StudyMapService } from '../study-map-service/study-map-service';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  map: any;
  showDirections = false;
  points = new Map<string, any>([
    ['start', []],
    ['end', []]
  ]);
  pointColours = new Map<string, string>([
    ['start', '#3887be'],
    ['end', '#f30']
  ]);

  constructor(private studyMapService: StudyMapService) {}

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.accessToken,
      container: 'map',
      style: 'mapbox://styles/jimmykhang/cm8s5qptw00j701sdbuur5s5a',
      zoom: 0,
      dragRotate: false,
      pitchWithRotate: false,
      maxBounds: [[-79.51440, 43.76300], [-79.49500, 43.78147]],
    });
    let onStartPoint = false;

    this.studyMapService.currentCoords.subscribe(studyAreaCoords => {
      this.points.set('end', studyAreaCoords);
      this.updatePoint('end');
      this.updateRoute();
    });

    this.map.on('mousemove', 'start', (event: any) => {
      this.map.getCanvas().style.cursor = 'pointer';
      onStartPoint = true;
    });

    this.map.on('mouseleave', 'start', (event: any) => {
      this.map.getCanvas().style.cursor = '';
      onStartPoint = false;
    });

    this.map.on('click', (event: any) => {
      this.points.set('start', onStartPoint ? [] : [event.lngLat.lng, event.lngLat.lat]);
      this.map.getCanvas().style.cursor = onStartPoint ? '' : 'pointer';
      onStartPoint = !onStartPoint;
      this.updatePoint('start');
      this.updateRoute();
    });
  }

  updatePoint(pointId: string) {
    const pointCoords = this.points.get(pointId);
    if (pointCoords.length == 0) {
      if (this.map.getLayer(pointId)) {
        this.map.removeLayer(pointId);
        this.map.removeSource(pointId);
      }
      return;
    }
    const pointData: GeoJSON.GeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: pointCoords
          }
        }
      ]
    };
    if (this.map.getLayer(pointId)) {
      (this.map.getSource(pointId) as mapboxgl.GeoJSONSource).setData(pointData);
    } else {
      this.map.addLayer({
        id: pointId,
        type: 'circle',
        source: {
          type: 'geojson',
          data: pointData
        },
        paint: {
          'circle-radius': 10,
          'circle-color': this.pointColours.get(pointId)
        }
      });
    }
  }

  async updateRoute() {
    // Guard case for invalid routes
    if (!this.map.getLayer('end') || !this.map.getLayer('start')) {
      if (this.map.getLayer('route')) {
        this.map.removeLayer('route');
        this.map.removeSource('route');
        this.showDirections = false;
      }
      return;
    }
    this.showDirections = true;
    // Format route data
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/
      ${this.points.get('start')[0]},${this.points.get('start')[1]};${this.points.get('end')[0]},${this.points.get('end')[1]}
      ?steps=true&geometries=geojson&access_token=${environment.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    const routeCoords = data.geometry.coordinates;
    const routeData: GeoJSON.GeoJSON = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoords
      }
    };
    // Draw route lines
    if (this.map.getSource('route')) {
      (this.map.getSource('route') as mapboxgl.GeoJSONSource).setData(routeData);
    }
    else {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: routeData
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
    // Write route directions
    const instructions = document.getElementById('instructions');
    const steps = data.legs[0].steps;
    let tripInstructions = '';
    for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    if (instructions != null) {
      instructions.innerHTML = `<p><strong>Walking Time 🚶: ${Math.floor(
        data.duration / 60
      )} min</strong></p><ol>${tripInstructions}</ol>`;
    }
  }
}