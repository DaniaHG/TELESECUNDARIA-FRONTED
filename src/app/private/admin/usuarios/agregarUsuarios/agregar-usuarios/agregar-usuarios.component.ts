import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent implements OnInit {


  usuarios: Usuarios = {
    id: '',
    userName: '',
    pass: '',
    roleId: '',
    idDocente: "",
    docente: ""

  }

  roleId: any[] = [
    'admin', 'user'
  ];

  addressForm = this.fb.group({
    id: [''],
    userName: ['', Validators.required],
    pass: ['', Validators.required],
    roleId: ['', Validators.required],
    idDocente: [''],
  });
  editing: boolean = false;

  constructor(private usuariosService: UsuariosService,
    private router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const id = this._activatedRoute.snapshot.params.id;

    if (id) {
      this.editing = true;
      this.usuariosService.getIdUsuarios(id).subscribe(
        res => {
          this.usuarios = res[0];
          console.log(res[0]);
        },
        err => console.log(err)
      )
    } else {
      this.editing = false;
    }
  }

  agregarUsuarios() {
    if (this.editing) {
      this.usuariosService.putUsuarios(this.usuarios.id, this.usuarios);
      this.router.navigate(['/mostrarUsuarios']);

    } else {
      const usuario: Usuarios = {
        id: this.addressForm.value.id,
        userName: this.addressForm.value.userName,
        pass: this.addressForm.value.pass,
        roleId: this.addressForm.value.roleId,
        idDocente: this.addressForm.value.idDocente,
        docente: this.addressForm.value.docente,
      }
      this.usuariosService.postUsuarios(usuario);
      this.router.navigate(['/mostrarUsuarios']);
    }
  }

}
