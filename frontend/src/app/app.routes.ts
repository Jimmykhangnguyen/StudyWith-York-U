import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'map', component: MapLayoutComponent},
    { path: 'reviews', component: MapLayoutComponent},
    { path: 'favourites', component: MapLayoutComponent},
    { path: '', redirectTo: '/map', pathMatch: 'full' } 
];

