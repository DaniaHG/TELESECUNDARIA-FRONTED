import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Materias } from 'src/app/interfaces/materias';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-agregar-materias',
  templateUrl: './agregar-materias.component.html',
  styleUrls: ['./agregar-materias.component.css']
})
export class AgregarMateriasComponent implements OnInit {

  materias: Materias= {
    id: '',
    nombre: '',
    grado: '',
    seccion: '',
    status: '',
    docentes_id: '',
    docente: ''

    }

    estado: any[] = [
      'activo', 'inactivo'
    ];

    addressForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      grado: ['', Validators.required],
      seccion: ['', Validators.required],
      status: ['', Validators.required],
      docentes_id: ['', Validators.required],
      docente: ['']
    });
    editing: boolean = false;

  constructor(private materiasService:MateriasService,
              private router:Router,
              private fb: FormBuilder,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarMaterias();
    }

    cargarMaterias() {
      const id = this._activatedRoute.snapshot.params.id;

      if (id) {
        this.editing = true;
        this.materiasService.getIdMaterias(id).subscribe(
          res => {
            this.materias = res[0];
            console.log(res[0]);
          },
          err => console.log(err)
        )
      }else{
        this.editing = false;
      }
    }

    agregarMaterias(){
      if(this.editing){
        this.materiasService.putMaterias(this.materias.id, this.materias);
        this.router.navigate(['/mostrarMaterias']);

      }else{
        const materia: Materias = {
          id: this.addressForm.value.id,
          nombre: this.addressForm.value.nombre,
          grado: this.addressForm.value.grado,
          seccion: this.addressForm.value.seccion,
          status: this.addressForm.value.status,
          docentes_id: this.addressForm.value.docentes_id,
          docente: this.addressForm.value.docente

        }
        this.materiasService.postMaterias(materia);
        this.router.navigate(['/mostrarMaterias']);
     }
    }

}
