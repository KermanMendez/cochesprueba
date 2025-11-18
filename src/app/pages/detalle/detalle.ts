import { Component, inject } from '@angular/core';
import { ICoche } from '../../icoche';
import { Cocheremoteservice } from '../../services/cocheremoteservice';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {

  coche$!: Observable<ICoche>;
  coche: ICoche | undefined;
  cocheId: string = '';

  private activatedRoute = inject(ActivatedRoute);
  private cocheService = inject(Cocheremoteservice);

  constructor(){
    this.activatedRoute.params.subscribe((params) =>{
      //console.log(params)
      const paramId: number = Number(params['id']);
      //console.log(paramId)
      this.coche$ = this.cocheService.getCocheById(paramId)
      this.coche$.subscribe({
        next: (coche: ICoche) => {
          //console.log("Detalle loadCoche() Success")
          //console.log(coche)
          this.coche = coche
        },
        error: (error) => {
          console.error("Detalle loadCoche() Error")
          console.error(error)
        },
        complete: () => {
          console.log("Detalle loadCoche() Completed")
        }
      }) 
    });
  }


}
