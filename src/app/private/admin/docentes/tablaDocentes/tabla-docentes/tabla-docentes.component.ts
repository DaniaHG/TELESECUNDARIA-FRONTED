import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Docentes } from 'src/app/interfaces/docentes';
import { DocentesService } from 'src/app/services/docentes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-docentes',
  templateUrl: './tabla-docentes.component.html',
  styleUrls: ['./tabla-docentes.component.css']
})
export class TablaDocentesComponent implements OnInit {

  ListarDocentes!: Docentes[];
  constructor(private docentesService:DocentesService, private router:Router) { }

  ngOnInit(): void {
    this.listarDocentes();
  }

  listarDocentes(){

    this.docentesService.getDocentes().subscribe(
      res=>{
        console.log(res)
        this.ListarDocentes=<any>res;
      },
      err=> console.log(err)

    );

  }
  eliminar(id:string){
    this.docentesService.deleteDocentes(id).subscribe(
      res=>{
        console.log('Eliminado');

        this.router.navigate(['/mostrarDocentes']);
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
    this.router.navigate(['modificarDocentes',id])
  }

  agregar(){
    this.router.navigate(["agregarDocentes"])

    }
    actualizar(){
      setTimeout(location.reload.bind(location),100);
    }

}
