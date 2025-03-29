import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';
import { ReviewsLayoutComponent } from './reviews-layout/reviews-layout.component';
import { FavouritesLayoutComponent } from './favourites-layout/favourites-layout.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'map', component: MapLayoutComponent},
    { path: 'reviews', component: ReviewsLayoutComponent},
    { path: 'favourites', component: FavouritesLayoutComponent},
    { path: '', redirectTo: '/map', pathMatch: 'full' } 
];
