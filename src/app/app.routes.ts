import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Coches } from './pages/coches/coches';
import { Detalle } from './pages/detalle/detalle';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Homepage},
    {path: 'coches', component: Coches},
    { path: 'detalle/:id', component: Detalle}
];