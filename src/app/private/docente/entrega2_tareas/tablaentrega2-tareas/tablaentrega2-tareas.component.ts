import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Entrega2TareasService } from 'src/app/services/entrega2-tareas.service';
import { Entrega2Tareas } from 'src/app/interfaces/entrega2_tareas';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import jsPDF from 'jspdf';
import * as printJS from 'print-js'



@Component({
  selector: 'app-tablaentrega2-tareas',
  templateUrl: './tablaentrega2-tareas.component.html',
  styleUrls: ['./tablaentrega2-tareas.component.css']
})
export class Tablaentrega2TareasComponent implements OnInit {



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


  eliminar(id:string){
    this.entregaTareasService.deleteEntrega2Tareas(id).subscribe(
      res=>{
        console.log('Eliminado');

        this.router.navigate(['/mostrarEntrega2Tareas']);


      },
      err=> console.log(err));
      setTimeout(location.reload.bind(location),500);
  }

  modificar(id:string){
    this.router.navigate(['modificarEntregaTareas',id])
  }

  agregar(){
    this.router.navigate(["agregarEntregaTareas"])

    }
    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }

    onEdit(item:any){
item.isEdit=true;
    }

    save(item:any){
      item.isEdit =false;
      this.entregaTareasService.putEntrega2Tareas(item.id, item);
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
