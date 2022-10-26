import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleIDAdminGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const user: any = localStorage.getItem("user");
    const ObjUser = JSON.parse(user);
    if (ObjUser.roleId === "admin") {
      return true;
    } else {
      this.router.navigate(['/mostrarTareas']);
      return false;
    }
  }

}
