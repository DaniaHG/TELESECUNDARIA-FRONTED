import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleIDDocenteGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const user: any = localStorage.getItem("user");
    const ObjUser = JSON.parse(user);
    if (ObjUser.roleId === "user") {
      return true;
    } else {
      this.router.navigate(['/mostrarDocentes']);
      return false;
    }
  }

}
