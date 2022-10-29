import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EntregaTareasService } from 'src/app/services/entrega-tareas.service';
import { EntregaTareas } from 'src/app/interfaces/entrega_tareas';
import jsPDF from 'jspdf';
import * as printJS from 'print-js'


@Component({
  selector: 'app-tabla-reporte-tareas',
  templateUrl: './tabla-reporte-tareas.component.html',
  styleUrls: ['./tabla-reporte-tareas.component.css']
})


export class TablaReporteTareasComponent implements OnInit {

  teamJSON!: JSON;
  ListarEntregaTareas!: EntregaTareas[];

  constructor(private entregaTareasService:EntregaTareasService, private router:Router) { }
  
  ngOnInit(): void {
    this.listarEntregaTareas();
    
  }

  listarEntregaTareas(){

    this.entregaTareasService.getEntregaTareas().subscribe(
      res=>{
        console.log(res)
        this.ListarEntregaTareas=<any>res;
        this.teamJSON =<any>res;
      },
      err=> console.log(err)

    );

  }

  imprimir(){
    printJS({
	    printable: this.teamJSON,
	    properties: ['Id','Status','Alumno ID','Alumno','Tarea ID','Tarea','Materia','Periodo'],
	    type: 'json',
	    gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
	    gridStyle: 'border: 2px solid #3971A5;'
	})
   
  }

    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }
}
