
import { Alumnos } from '../../../../interfaces/alumnos';
import { Router, ActivatedRoute } from '@angular/router';
import { AluService } from 'src/app/services/alu.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lisalumno',
  templateUrl: './lisalumno.component.html',
  styleUrls: ['./lisalumno.component.css']
})
export class LisalumnoComponent implements OnInit {
  alumnos: Alumnos= {
    id: '',
    nombre: '',
    fecha_nacimiento: '',
    fecha_ingreso: '',
    direccion: '',
    telefono: '',
    status: ''

    }

    estado: any[] = [
      'activo', 'inactivo'
    ];

    addressForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      status: ['', Validators.required],

    });
    editing: boolean = false;


    constructor(private aluservice:AluService ,
                private router:Router,
                private fb: FormBuilder,
                private _activatedRoute: ActivatedRoute) { }

                 ngOnInit(): void {
    this.cargarAlumnos();
    }

    cargarAlumnos() {
      const id = this._activatedRoute.snapshot.params.id;

      if (id) {
        this.editing = true;
        this.aluservice.getIdAlumnos(id).subscribe(
          res => {
            this.alumnos = res[0];
            console.log(res[0]);
          },
          err => console.log(err)
        )
      }else{
        this.editing = false;
      }
    }

    agregarAlumnos(){
      if(this.editing){
        this.aluservice.putAlumnos(this.alumnos.id, this.alumnos);
        this.router.navigate(['/mostrarAlumnos']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Modificado con exito',
          showConfirmButton: false,
          timer: 1500
        })

      }else{
        const alumno: Alumnos = {
          id: this.addressForm.value.id,
          nombre: this.addressForm.value.nombre,
          fecha_nacimiento: this.addressForm.value.fecha_nacimiento,
          fecha_ingreso: this.addressForm.value.fecha_ingreso,
          direccion: this.addressForm.value.direccion,
          telefono: this.addressForm.value.telefono,
          status: this.addressForm.value.status,

        }
        this.aluservice.postAlumnos(alumno);
        this.router.navigate(['/mostrarAlumnos']);

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
