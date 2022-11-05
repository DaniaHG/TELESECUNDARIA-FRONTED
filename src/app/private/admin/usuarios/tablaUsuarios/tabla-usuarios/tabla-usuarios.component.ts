import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  ListarUsuarios!: Usuarios[];
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {

    this.usuariosService.getUsuarios().subscribe(
      res => {
        console.log(res)
        this.ListarUsuarios = <any>res;
      },
      err => console.log(err)

    );

  }
  eliminar(id: string) {
    this.usuariosService.deleteUsuarios(id).subscribe(
      res => {
        console.log('Eliminado');

        this.router.navigate(['/mostrarUsuarios']);
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
    this.router.navigate(['modificarUsuarios', id])
  }

  agregar() {
    this.router.navigate(["agregarUsuarios"])

  }
  actualizar() {
    setTimeout(location.reload.bind(location), 100);
  }

}
