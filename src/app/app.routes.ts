import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Coches } from './pages/coches/coches';
import { Detalle } from './pages/detalle/detalle';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Homepage},
    {path: 'coches', component: Coches, canActivate: [authGuard]},
    { path: 'detalle/:id', component: Detalle, canActivate: [authGuard] },
    { path: '**', redirectTo: '/home' }
];