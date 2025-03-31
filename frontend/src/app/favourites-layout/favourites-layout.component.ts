import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FavouritesComponent } from '../favourites/favourites.component';

@Component({
  selector: 'app-favourites-layout',
  standalone: true,
  imports: [NavBarComponent, FavouritesComponent],
  templateUrl: './favourites-layout.component.html',
  styleUrl: './favourites-layout.component.css'
})

export class FavouritesLayoutComponent {

}
