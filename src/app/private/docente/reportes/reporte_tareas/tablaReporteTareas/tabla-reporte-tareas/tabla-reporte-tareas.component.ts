import { environment } from './../../../../../../../environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Entrega2TareasService } from './../../../../../../services/entrega2-tareas.service';
import { Entrega2Tareas } from './../../../../../../interfaces/entrega2_tareas';
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

  teamJSON!: JSON
  ListarEntrega2Tareas!: Entrega2Tareas[];

  materiaElegido!: string;
  tareaElegido!: string;
  constructor(private entregaTareasService:Entrega2TareasService, private router:Router,private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      materia: ['', Validators.required]
    })

    this.form = this.fb.group({
      tarea: ['', Validators.required]
    })
  }

  collection = [{ 'nombre': this.getCollection }];
  collection2 = [{ 'nombre': this.getCollection2, 'id': this.getCollection2 }];
  form: FormGroup;



  ngOnInit(): void {
    this.listarEntrega2Tareas();
    this.getCollection();
    this.getCollection2();
  }

  getCollection() {
    this.http
      .get<any>(environment.URL_BASE + 'materias_tareas').subscribe((res: any) => {
      this.collection = res;

    }, error => {
      console.log({ error });
    })
  }
  getCollection2() {
    this.http
      .get<any>(environment.URL_BASE + 'tareas').subscribe((res: any) => {
      this.collection2 = res;
    }, error => {
      console.log({ error });
    })
  }




  grabar_localstorage() {
    console.log(this.form.value.materia)
    let materia = this.form.value.materia
    this.materiaElegido = materia;
    localStorage.setItem("materia", materia);
    this.listarEntrega2TareasMateria();
    //this.router.navigate(["/mostrarPeriodos"]);
  }

  listarEntrega2Tareas(){

    this.entregaTareasService.getEntrega2Tareas().subscribe(
      res=>{
        console.log(res)
        this.ListarEntrega2Tareas=<any>res;
        this.teamJSON =<any>res;
      },
      err=> console.log(err)

    );

  }

  listarEntrega2TareasMateria() {
    this.entregaTareasService.getMateriaEntrega2Tareas(this.materiaElegido).subscribe(
      res => {
        this.ListarEntrega2Tareas = <any>res;
        this.teamJSON =<any>res;

      },
      err => console.log(err)
    );
  }
  materiaCambio(materia: string) {
    this.materiaElegido = materia
    this.listarEntrega2TareasMateria();
  }
 tareaCambio(tarea: string) {
    this.tareaElegido = tarea

  }

    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }

    imprimir(){
      printJS({
        printable: this.teamJSON,
        properties: ['id','alumno','materia','tarea','status','calificacion'],
        type: 'json',
        gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
        gridStyle: 'border: 2px solid #3971A5;'
    })



    }
}
