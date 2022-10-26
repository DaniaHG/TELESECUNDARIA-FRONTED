import { Router, ActivatedRoute } from '@angular/router';

import { Validators, FormBuilder } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { MateriaDocente } from 'src/app/interfaces/materia-docente';
import { MateriaDocenteService } from 'src/app/services/materia-docente.service';

@Component({
  selector: 'app-agregar-materia-docente',
  templateUrl: './agregar-materia-docente.component.html',
  styleUrls: ['./agregar-materia-docente.component.css']
})
export class AgregarMateriaDocenteComponent implements OnInit {

  materiasDocente: MateriaDocente= {
    id: '',
    docentes_id: '',
    docente: '',
    materias_id: '',
    materia: ''

    }
    addressForm = this.fb.group({
      id: [''],
      docentes_id: ['', Validators.required],
      docente: [''],
      materias_id: ['', Validators.required],
      materia: ['']
    });
    editing: boolean = false;

  constructor(private materiasDocenteService:MateriaDocenteService,
              private router:Router,
              private fb: FormBuilder,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarMateriaDocente();
    }

    cargarMateriaDocente() {
      const id = this._activatedRoute.snapshot.params.id;

      if (id) {
        this.editing = true;
        this.materiasDocenteService.getIdMateriaDocente(id).subscribe(
          res => {
            this.materiasDocente = res[0];
            console.log(res[0]);
          },
          err => console.log(err)
        )
      }else{
        this.editing = false;
      }
    }

    agregarMateriaDocente(){
      if(this.editing){
        this.materiasDocenteService.putMateriaDocente(this.materiasDocente.id, this.materiasDocente);
        this.router.navigate(['/mostrarMateriasDocente']);

      }else{
        const materiaDocente: MateriaDocente = {
          id: this.addressForm.value.id,
          docentes_id: this.addressForm.value.docentes_id,
          docente: this.addressForm.value.docente,
          materias_id: this.addressForm.value.materias_id,
          materia: this.addressForm.value.materia
        }
        this.materiasDocenteService.postMateriaDocente(materiaDocente);
        this.router.navigate(['/mostrarMateriasDocente']);
     }
    }

}

