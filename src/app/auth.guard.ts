import { SecurityService } from './services/security.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) { }

  canActivate(): boolean {
    if (this.securityService.logedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


}
