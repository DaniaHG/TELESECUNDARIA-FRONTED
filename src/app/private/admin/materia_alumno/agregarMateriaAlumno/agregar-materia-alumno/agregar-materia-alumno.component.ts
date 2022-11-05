import { Materias } from 'src/app/interfaces/materias';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MateriaAlumno } from 'src/app/interfaces/materia-alumno';
import { MateriaAlumnoService } from 'src/app/services/materia-alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-materia-alumno',
  templateUrl: './agregar-materia-alumno.component.html',
  styleUrls: ['./agregar-materia-alumno.component.css']
})
export class AgregarMateriaAlumnoComponent implements OnInit {


  materiasAlumno: MateriaAlumno= {
    id: '',
    status: '',
    materias_id: '',
    materia: '',
    alumnos_id: '',
    alumno: '',
    docente: ''

    }

    estado: any[] = [
      'activo', 'inactivo'
    ];

    addressForm = this.fb.group({
      id: [''],
      status: ['', Validators.required],
      materias_id: ['', Validators.required],
      materia: [''],
      alumnos_id: ['', Validators.required],
      alumno: [''],
      docente: [''],
    });
    editing: boolean = false;

  constructor(private materiasAlumnoService:MateriaAlumnoService,
              private router:Router,
              private fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarMateriaAlumno();
    this.getCollection();
    this.getCollectionAlumnos();
    }

    collection = [{ 'nombre': this.getCollection, 'id': this.getCollection }];
    collectionAlumnos = [{ 'nombre': this.getCollection, 'id': this.getCollection }];

    getCollection() {
      this.http
        .get<any>(environment.URL_BASE + 'materias').subscribe((res: any) => {
        this.collection = res;
      }, error => {
        console.log({ error });
      })
    }

    getCollectionAlumnos() {
      this.http
        .get<any>(environment.URL_BASE + 'alumnos').subscribe((res: any) => {
        this.collectionAlumnos = res;
      }, error => {
        console.log({ error });
      })
    }

    cargarMateriaAlumno() {
      const id = this._activatedRoute.snapshot.params.id;

      if (id) {
        this.editing = true;
        this.materiasAlumnoService.getIdMateriaAlumno(id).subscribe(
          res => {
            this.materiasAlumno = res[0];
            console.log(res[0]);
          },
          err => console.log(err)
        )
      }else{
        this.editing = false;
      }
    }

    agregarMateriaAlumno(){
      if(this.editing){
        this.materiasAlumnoService.putMateriaAlumno(this.materiasAlumno.id, this.materiasAlumno);
        this.router.navigate(['/mostrarMateriasAlumno']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Modificado con exito',
          showConfirmButton: false,
          timer: 1500
        })

      }else{
        const materiaAlumno: MateriaAlumno = {
          id: this.addressForm.value.id,
          status: this.addressForm.value.status,
          materias_id: this.addressForm.value.materias_id,
          materia: this.addressForm.value.materia,
          alumnos_id: this.addressForm.value.alumnos_id,
          alumno: this.addressForm.value.alumno,
          docente: this.addressForm.value.docente

        }
        this.materiasAlumnoService.postMateriaAlumno(materiaAlumno);
        this.router.navigate(['/mostrarMateriasAlumno']);
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


