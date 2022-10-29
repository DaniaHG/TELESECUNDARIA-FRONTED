import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Periodos } from 'src/app/interfaces/periodos';
import { PeriodosService } from 'src/app/services/periodos.service';

@Component({
  selector: 'app-agregar-periodos',
  templateUrl: './agregar-periodos.component.html',
  styleUrls: ['./agregar-periodos.component.css']
})
export class AgregarPeriodosComponent implements OnInit {

  periodos: Periodos= {
    id: '',
    descripcion: '',
    ciclo: '',
    status: '',
    fecha_inicio: '',
    fecha_fin: ''
    }

    estado: any[] = [
      'activo', 'inactivo'
    ];

    descripcion: any[] = [
      'Primera unidad', 'Segunda unidad', 'Tercera unidad', 'Cuarta unidad'
    ];

    addressForm = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
      ciclo: ['', Validators.required],
      status: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
    editing: boolean = false;

  constructor(private periodosService:PeriodosService,
              private router:Router,
              private fb: FormBuilder,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPeriodos();
    }

    cargarPeriodos() {
      const id = this._activatedRoute.snapshot.params.id;

      if (id) {
        this.editing = true;
        this.periodosService.getIdPeriodos(id).subscribe(
          res => {
            this.periodos = res[0];
            console.log(res[0]);
          },
          err => console.log(err)
        )
      }else{
        this.editing = false;
      }
    }

    agregarPeriodos(){
      if(this.editing){
        this.periodosService.putPeriodos(this.periodos.id, this.periodos);
        this.router.navigate(['/mostrarPeriodos']);

      }else{
        const periodo: Periodos = {
          id: this.addressForm.value.id,
          descripcion: this.addressForm.value.descripcion,
          ciclo: this.addressForm.value.ciclo,
          status: this.addressForm.value.status,
          fecha_inicio: this.addressForm.value.fecha_inicio,
          fecha_fin: this.addressForm.value.fecha_fin
        }
        this.periodosService.postPeriodos(periodo);
        this.router.navigate(['/mostrarPeriodos']);
     }
    }
}
