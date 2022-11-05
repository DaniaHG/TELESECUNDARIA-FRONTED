import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { MateriaAlumno } from 'src/app/interfaces/materia-alumno';
import { MateriaAlumnoService } from 'src/app/services/materia-alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-materia-alumno',
  templateUrl: './tabla-materia-alumno.component.html',
  styleUrls: ['./tabla-materia-alumno.component.css']
})
export class TablaMateriaAlumnoComponent implements OnInit {

  ListarMateriasAlumno!: MateriaAlumno[];
  constructor(private materiasAlumnoService:MateriaAlumnoService, private router:Router) { }

  ngOnInit(): void {
    this.listarMateriasAlumno();
  }

  listarMateriasAlumno(){

    this.materiasAlumnoService.getMateriaAlumno().subscribe(
      res=>{
        console.log(res)
        this.ListarMateriasAlumno=<any>res;
      },
      err=> console.log(err)

    );

  }
  eliminar(id:string){
    this.materiasAlumnoService.deleteMateriaAlumno(id).subscribe(
      res=>{
        console.log('Eliminado');

        this.router.navigate(['/mostrarMateriasAlumno']);
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
    this.router.navigate(['modificarMateriasAlumno',id])
  }

  agregar(){
    this.router.navigate(["agregarMateriasAlumno"])

    }
    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }

}

