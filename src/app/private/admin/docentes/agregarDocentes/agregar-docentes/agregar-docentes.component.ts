
import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Docentes } from 'src/app/interfaces/docentes';
import { DocentesService } from 'src/app/services/docentes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-docentes',
  templateUrl: './agregar-docentes.component.html',
  styleUrls: ['./agregar-docentes.component.css']
})
export class AgregarDocentesComponent implements OnInit {

  docentes: Docentes= {
    id: '',
    dpi: '',
    nombre: '',
    fecha_nacimiento: '',
    fecha_ingreso: '',
    direccion: '',
    telefono: '',
    correo: '',
    status: ''
    }

    estado: any[] = [
      'activo', 'inactivo'
    ];

    addressForm = this.fb.group({
      id: [''],
      dpi: ['', Validators.required],
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      status: ['', Validators.required]
    });
    editing: boolean = false;

  constructor(private docentesService:DocentesService,
              private router:Router,
              private fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarDocentes();
    }

    cargarDocentes() {
      const id = this._activatedRoute.snapshot.params.id;

      if (id) {
        this.editing = true;
        this.docentesService.getIdDocentes(id).subscribe(
          res => {
            this.docentes = res[0];
            console.log(res[0]);
          },
          err => console.log(err)
        )
      }else{
        this.editing = false;
      }
    }

    agregarDocentes(){
      if(this.editing){
        this.docentesService.putDocentes(this.docentes.id, this.docentes);
        this.router.navigate(['/mostrarDocentes']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Modificado con exito',
          showConfirmButton: false,
          timer: 1500
        })

      }else{
        const docente: Docentes = {
          id: this.addressForm.value.id,
          dpi: this.addressForm.value.dpi,
          nombre: this.addressForm.value.nombre,
          fecha_nacimiento: this.addressForm.value.fecha_nacimiento,
          fecha_ingreso: this.addressForm.value.fecha_ingreso,
          direccion: this.addressForm.value.direccion,
          telefono: this.addressForm.value.telefono,
          correo: this.addressForm.value.correo,
          status: this.addressForm.value.status
        }
        this.docentesService.postDocentes(docente);
        this.router.navigate(['/mostrarDocentes']);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Agregado con exito',
          showConfirmButton: false,
          timer: 1500
        })

     }
    }
}
