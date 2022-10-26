import { SecurityService } from './services/security.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-app';

  constructor(private securityService:SecurityService){}

  logedIn(){
    return this.securityService.logedIn();
  }
}
