import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  showPopup: boolean = false;

  constructor(private http: HttpClient) {};

  ngOnInit(): void {

  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }
}
