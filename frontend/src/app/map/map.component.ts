import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { StudyMapService } from '../study-map-service/study-map-service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  constructor(private studyMapService: StudyMapService) {}

  ngOnInit() {
    const map = new mapboxgl.Map({
      accessToken: environment.accessToken,
      container: 'map',
      style: 'mapbox://styles/jimmykhang/cm701v76n007w01qu16uy4vvu',
      zoom: 9,
      maxBounds: [[-79.51440, 43.76300], [-79.49500, 43.78147]],
    });
    
    var startCoords: number[] = [];
    var endCoords: number[] = [];

    function configPointData(coords: number[]): GeoJSON.GeoJSON | null {
      if (coords.length == 0) {
        return null;
      }
      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords
            }
          }
        ]
      };
    }

    function updatePoint(pointId: string, pointData: GeoJSON.GeoJSON | null, colour: string) {
      if (pointData == null) {
        map.removeLayer(pointId);
        map.removeSource(pointId);
        return;
      }
      if (map.getLayer(pointId)) {
        (map.getSource(pointId) as mapboxgl.GeoJSONSource).setData(pointData);
      } else {
        map.addLayer({
          id: pointId,
          type: 'circle',
          source: {
            type: 'geojson',
            data: pointData
          },
          paint: {
            'circle-radius': 10,
            'circle-color': colour
          }
        });
      }
    }

    async function updateRoute() {
      // Guard case for invalid routes
      if (!map.getLayer('end') || !map.getLayer('start')) {
        map.removeLayer('route');
        map.removeSource('route');
        return;
      }
      // Format route data
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/
        ${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}
        ?steps=true&geometries=geojson&access_token=${environment.accessToken}`,
        { method: 'GET' }
      );
      const json = await query.json();
      const data = json.routes[0];
      const routeCoords = data.geometry.coordinates;
      const route: GeoJSON.GeoJSON = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoords
        }
      };
      // Draw route lines
      if (map.getSource('route')) {
        (map.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
      }
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: route
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
      // Write route instructions
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

    this.studyMapService.currentCoords.subscribe(studyAreaCoords => {
      endCoords = studyAreaCoords;
      updatePoint('end', configPointData(endCoords), '#f30');
      updateRoute();
    });

    map.on('click', (event) => {
      startCoords = [event.lngLat.lng, event.lngLat.lat];
      updatePoint('start', configPointData(startCoords), '#3887be');
      updateRoute();
    });
  }
}