import { Router } from '@angular/router';
import { SecurityService } from './../../services/security.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/services/security.service';

@Component({
  selector: 'app-login-formulario',
  templateUrl: './login-formulario.component.html',
  styleUrls: ['./login-formulario.component.css']
})
export class LoginFormularioComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    userName: '',
    password: ''
  };

  addressForm = this.fb.group({

    id: [""],
    userName: [null, Validators.required],
    password: [null, Validators.required],

  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private securitySevice: SecurityService, private router: Router) { }
  ngOnInit(): void {
    try {
      const user: any = localStorage.getItem("user");
      const ObjUser = JSON.parse(user);
      if (ObjUser.roleId === "user") {
        this.router.navigate(['mostrarTareas']);
      } else {
        this.router.navigate(['mostrarDocentes']);
      }
    } catch (error) { }
  }

  onLogin() {
    this.securitySevice.login(this.usuario).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        if (res.user.roleId === "admin") {
          this.router.navigate(['mostrarDocentes']);
        } else {
          this.router.navigate(['mostrarTareas']);
        }

      }
    )
  }
}
