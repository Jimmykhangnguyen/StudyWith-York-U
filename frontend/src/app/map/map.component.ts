import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from './../../environments/environment';
import { StudyMapService } from '../study-map-service/study-map-service';
import { HttpClientModule } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  map: any;
  showDirections = false;
  showFeedback = false;
  studyAreaId = '';
  points = new Map<string, any>([
    ['start', []],
    ['end', []]
  ]);
  pointColours = new Map<string, string>([
    ['start', '#27e8e5'],
    ['end', '#e31836']
  ]);
  rating: number = 0;
  hoverRating: number = 0;
  questions: number = 1;
  questionTexts: string[] = [
    "How busy is the space?",
    "How clean is the space?",
    "How loud is the space?",
    "Overall, how do you feel about the space?",
    "Thank you for your feedback!"
  ];
  questionLabels: string[][] = [
    ["Very Empty", "Very Busy"],
    ["Very Dirty", "Very Clean"],
    ["Very Quiet", "Very Loud"],
    ["Very Bad", "Awesome!"],
    ["", ""]
  ];
  fadeOut: boolean = false;

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

    this.studyMapService.currentFeedback.subscribe(showFeedback => {
      this.showFeedback = showFeedback;
      console.log('Feedback Visibility:', this.showFeedback);
      if (this.showFeedback) {
        this.questions = 1;
        this.rating = 0;
      }
    });

    this.studyMapService.currentId.subscribe(id => {
      this.studyAreaId = id;
      console.log('Study Area ID:', this.studyAreaId);
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
          'line-color': '#e31836',
          'line-width': 5
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

  onMouseEnter(star: number) {
    this.hoverRating = star;
  }

  onMouseLeave() {
    this.hoverRating = 0;
  }

  setRating(star: number) {
    if (this.questions < 5) {
      this.rating = star;
      this.fadeOut = true;

      setTimeout(() => {
        if (this.questions < 5) {
          this.questions++;
        }
        this.fadeOut = false;

        if (this.questions == 2) {
          this.studyMapService.rateBusyness(this.studyAreaId, this.rating);
          this.rating = 0;
        } else if (this.questions == 3) {
          this.studyMapService.rateCleanliness(this.studyAreaId, this.rating);
          this.rating = 0;
        } else if (this.questions == 4) {
          this.studyMapService.rateLoudness(this.studyAreaId, this.rating);
          this.rating = 0;
        } else if (this.questions == 5) {
          this.studyMapService.rateStudyArea(this.studyAreaId, this.rating);
          this.rating = 5;
        }
        setTimeout(() => {this.studyMapService.getData()}, 100);
      }, 500);
    }
  }
}