import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EntregaTareasService } from 'src/app/services/entrega-tareas.service';
import { EntregaTareas } from 'src/app/interfaces/entrega_tareas';

@Component({
  selector: 'app-tabla-entrega-tareas',
  templateUrl: './tabla-entrega-tareas.component.html',
  styleUrls: ['./tabla-entrega-tareas.component.css']
})
export class TablaEntregaTareasComponent implements OnInit {

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
      },
      err=> console.log(err)

    );

  }
  eliminar(id:string){
    this.entregaTareasService.deleteEntregaTareas(id).subscribe(
      res=>{
        console.log('Eliminado');

        this.router.navigate(['/mostrarEntregaTareas']);


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
}
