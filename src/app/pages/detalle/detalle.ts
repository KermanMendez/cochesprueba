import { Component, inject } from '@angular/core';
import { ICoche } from '../../icoche';
import { Cocheremoteservice } from '../../services/cocheremoteservice';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  coche$!: Observable<ICoche>;
  coche: ICoche | undefined;
  cocheId: string = '';
  mostrarFormulario: boolean = false;
  cocheForm!: FormGroup;

  private activatedRoute = inject(ActivatedRoute);
  private cocheService = inject(Cocheremoteservice);
  private fb = inject(FormBuilder);

  constructor(){
    this.activatedRoute.params.subscribe((params) =>{
      const paramId: number = Number(params['id']);
      this.coche$ = this.cocheService.getCocheById(paramId)
      this.coche$.subscribe({
        next: (coche: ICoche) => {
          this.coche = coche;
          this.initForm(coche);
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

  initForm(coche: ICoche) {
    this.cocheForm = this.fb.group({
      id: [coche.id],
      marca: [coche.marca],
      modelo: [coche.modelo],
      matricula: [coche.matricula],
      kms: [coche.kms],
      precio: [coche.precio],
      tipo: [coche.tipo],
      fotoURL: [coche.fotoURL]
    });

    // Alternativa: actualizar los valores del formulario campo a campo
    // this.cocheForm.controls['id'].setValue(coche.id);
    // this.cocheForm.controls['marca'].setValue(coche.marca);
    // this.cocheForm.controls['modelo'].setValue(coche.modelo);
    // this.cocheForm.controls['matricula'].setValue(coche.matricula);
    // this.cocheForm.controls['kms'].setValue(coche.kms);
    // this.cocheForm.controls['precio'].setValue(coche.precio);
    // this.cocheForm.controls['tipo'].setValue(coche.tipo);
    // this.cocheForm.controls['fotoURL'].setValue(coche.fotoURL);
  }

  onSubmit() {
    if (this.coche && this.cocheForm.valid) {
      this.cocheService.updateCoche(Number(this.coche.id), this.cocheForm.value).subscribe({
        next: (coche: ICoche) => {
          this.coche = coche;
          this.initForm(coche); // refresca el formulario con los datos actualizados
        }, error: (error) => {
          console.error('Error updating coche:', error);
        }, complete: () => {
          console.log('Coche updated successfully');
        }
      });
    }
  }
}
