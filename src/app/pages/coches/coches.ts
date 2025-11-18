import { Component, inject } from '@angular/core';
import { Cocheremoteservice } from '../../services/cocheremoteservice';
import { ICoche } from '../../icoche';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coches',
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './coches.html',
  styleUrl: './coches.css',
})
export class Coches {

  cocheService = inject(Cocheremoteservice);
  coches: ICoche[] = [];

  constructor() {
    
  }

  ngOnInit() {
    this.cocheService.getAllCoches().subscribe(data => {
      this.coches = data;
    });
  }

  getFeaturedCoches() {
    this.cocheService.getFeaturedCoches().subscribe(data => {
      this.coches = data;
    });
  }

  getCochesByType(tipo: string) {
    if (!tipo) {
      this.cocheService.getAllCoches().subscribe(data => {
        this.coches = data;
      });
    } else {
      this.cocheService.getAllCoches().subscribe(data => {
      this.coches = data.filter(coche => String(coche.tipo).includes(tipo));
      });
    }
  }
  
      getCochesByMarca(marca: string) {
        if (!marca) {
          this.cocheService.getAllCoches().subscribe(data => {
            this.coches = data;
          });
        } else {
          this.cocheService.getCochesByMarca(marca).subscribe(data => {
            this.coches = data;
          });
        }
      }

  
}