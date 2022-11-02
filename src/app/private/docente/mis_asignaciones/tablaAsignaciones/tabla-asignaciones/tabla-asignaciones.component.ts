import { AsignacionesService } from './../../../../../services/asignaciones.service';
import { Router } from '@angular/router';
import { Materias } from 'src/app/interfaces/materias';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-asignaciones',
  templateUrl: './tabla-asignaciones.component.html',
  styleUrls: ['./tabla-asignaciones.component.css']
})
export class TablaAsignacionesComponent implements OnInit {

  ListarMaterias!: Materias[];
  constructor(private asignacionesService:AsignacionesService, private router:Router) { }

  ngOnInit(): void {
    this.listarMaterias();
  }

  listarMaterias(){

    this.asignacionesService.getMaterias().subscribe(
      res=>{
        console.log(res)
        this.ListarMaterias=<any>res;
      },
      err=> console.log(err)

    );

  }


    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }

}
