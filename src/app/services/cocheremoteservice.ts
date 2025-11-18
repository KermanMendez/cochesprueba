import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoche } from '../icoche';

@Injectable({
  providedIn: 'root',
})
export class Cocheremoteservice {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/coche';

  getAllCoches(): Observable<ICoche[]> {
    return this.http.get<ICoche[]>(this.apiUrl);
  }
  
  getFeaturedCoches(): Observable<ICoche[]> {
    return this.http.get<ICoche[]>(`${this.apiUrl}?_limit=4`)
  }

  getCochesByTipo(tipo: string): Observable<ICoche[]> {
  return this.http.get<ICoche[]>(`${this.apiUrl}?tipo_like=${tipo}`);
  }

  getCochesByMarca(marca: string): Observable<ICoche[]> {
    return this.http.get<ICoche[]>(`${this.apiUrl}?marca=${marca}`);
  }

  createCoche(coche: ICoche): Observable<ICoche> {
    const data = { 
      id: `${coche.id}`, marca: coche.marca, modelo: coche.modelo, matricula: coche.matricula,
      kms: coche.kms, precio: coche.precio, tipo: coche.tipo, fotoURL: coche.fotoURL 
    };
    return this.http.post<ICoche>(`${this.apiUrl}`, data);
  }

  updateCoche(id: number, coche: ICoche): Observable<ICoche> {
    const data = { 
      id: `${coche.id}`, marca: coche.marca, modelo: coche.modelo, matricula: coche.matricula,
      kms: coche.kms, precio: coche.precio, tipo: coche.tipo, fotoURL: coche.fotoURL 
    };
    return this.http.put<ICoche>(`${this.apiUrl}/${id}`, data);
  }

  deleteCocheById(id: number): Observable<ICoche> {
    return this.http.delete<ICoche>(`${this.apiUrl}/${id}`);
  }

  getCocheById(id: number): Observable<ICoche> {
    return this.http.get<ICoche>(`${this.apiUrl}/${id}`);
  }

}
