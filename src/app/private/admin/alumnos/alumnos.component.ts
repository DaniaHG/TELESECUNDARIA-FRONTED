import { Alumnos } from '../../../interfaces/alumnos';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AluService } from 'src/app/services/alu.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  ListarAlumnos!: Alumnos[];
  constructor(private AluService:AluService, private router:Router) { }

  ngOnInit(): void {
    this.listarAlumnos();
  }

  listarAlumnos(){

    this.AluService.getAlumnos().subscribe(
      res=>{
        console.log(res)
        this.ListarAlumnos=<any>res;
      },
      err=> console.log(err)

    );

  }
  eliminar(id:string){
    this.AluService.deleteAlumnos(id).subscribe(
      res=>{
        console.log('Eliminado');

        this.router.navigate(['/mostrarAlumnos']);
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
    this.router.navigate(['/modificarAlumnos',id])
  }

  agregar(){
    this.router.navigate(["/AgregarAlumnos"])

    }
    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }

}
