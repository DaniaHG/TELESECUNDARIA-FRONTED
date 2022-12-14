import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Materias } from 'src/app/interfaces/materias';
import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-materias',
  templateUrl: './tabla-materias.component.html',
  styleUrls: ['./tabla-materias.component.css']
})
export class TablaMateriasComponent implements OnInit {

  ListarMaterias!: Materias[];
  constructor(private materiasService:MateriasService, private router:Router) { }

  ngOnInit(): void {
    this.listarMaterias();
  }

  listarMaterias(){

    this.materiasService.getMaterias().subscribe(
      res=>{
        console.log(res)
        this.ListarMaterias=<any>res;
      },
      err=> console.log(err)

    );

  }
  eliminar(id:string){
    this.materiasService.deleteMaterias(id).subscribe(
      res=>{
        console.log('Eliminado');

        this.router.navigate(['/mostrarMaterias']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado con exito',
          showConfirmButton: false,
          timer: 1500
        })



      },
      err=> console.log(err));
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops algo salio mal',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(location.reload.bind(location),500);
  }

  modificar(id:string){
    this.router.navigate(['modificarMaterias',id])
  }

  agregar(){
    this.router.navigate(["agregarMaterias"])

    }
    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }

}
