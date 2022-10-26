import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EntregaTareas } from 'src/app/interfaces/entrega_tareas';
import { EntregaTareasService } from 'src/app/services/entrega-tareas.service';


@Component({
  selector: 'app-agregar-entrega-tareas',
  templateUrl: './agregar-entrega-tareas.component.html',
  styleUrls: ['./agregar-entrega-tareas.component.css']
})
export class AgregarEntregaTareasComponent implements OnInit {

  entregaTareas: EntregaTareas= {
    id: '',
    status: '',
    alumnos_id: '',
    alumno: '',
    tareas_id: '',
    tarea:'',
    materia:'',
    periodo:''

    }

    estado: any[] = [
      'entregado', 'faltante'
    ];

    addressForm = this.fb.group({
      id: [''],
      status:['', Validators.required],
      alumnos_id: ['', Validators.required],
      alumno: [''],
      tareas_id: ['', Validators.required],
      tarea: [''],
      materia: [''],
      periodo: ['']
    });

    editing: boolean = false;

  constructor(private entregaTareasService:EntregaTareasService,
              private router:Router,
              private fb: FormBuilder,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEntregaTareas();
    }

    cargarEntregaTareas() {
      const id = this._activatedRoute.snapshot.params.id;

      if (id) {
        this.editing = true;
        this.entregaTareasService.getIdEntregaTareas(id).subscribe(
          res => {
            this.entregaTareas = res[0];
            console.log(res[0]);
          },
          err => console.log(err)
        )
      }else{
        this.editing = false;
      }
    }

    agregarEntregaTareas(){
      if(this.editing){
        this.entregaTareasService.putEntregaTareas(this.entregaTareas.id, this.entregaTareas);
        this.router.navigate(['/mostrarEntregaTareas']);

      }else{
        const entregaTareas: EntregaTareas = {
          id: this.addressForm.value.id,
          status: this.addressForm.value.status,
          alumnos_id: this.addressForm.value.alumnos_id,
          alumno: this.addressForm.value.alumno,
          tareas_id: this.addressForm.value.tareas_id,
          tarea: this.addressForm.value.tarea,
          materia: this.addressForm.value.materia,
          periodo: this.addressForm.value.periodo
        }
        this.entregaTareasService.postEntregaTareas(entregaTareas);
        this.router.navigate(['/mostrarEntregaTareas']);
     }
    }

}
