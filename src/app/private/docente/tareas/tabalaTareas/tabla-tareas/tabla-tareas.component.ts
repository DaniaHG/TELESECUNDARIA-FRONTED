import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from '../../../../../services/tareas.service';
import { Tareas } from '../../../../../interfaces/tareas';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-tareas',
  templateUrl: './tabla-tareas.component.html',
  styleUrls: ['./tabla-tareas.component.css']
})
export class TablaTareasComponent implements OnInit {



  ListarTareas!: Tareas[];
  constructor(private tareasService: TareasService, private router: Router) { }

  ngOnInit(): void {
    this.listarTareas();
  }

  listarTareas() {

    this.tareasService.getTareas().subscribe(
      res => {
        console.log(res)
        this.ListarTareas = <any>res;
      },
      err => console.log(err)

    );

  }
  eliminar(id: string) {
    this.tareasService.deleteTareas(id).subscribe(
      res => {
        console.log('Eliminado');
        this.router.navigate(['/mostrarTareas']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => console.log(err));
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops algo salio mal',
        showConfirmButton: false,
        timer: 1500
      })
    setTimeout(location.reload.bind(location), 500);
  }

  modificar(id: string) {
    this.router.navigate(['modificarTareas', id])
  }

  agregar() {
    this.router.navigate(["agregarTareas"])

  }
  actualizar() {
    setTimeout(location.reload.bind(location), 100);
  }

}
