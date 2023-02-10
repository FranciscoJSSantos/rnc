import { Component } from '@angular/core';
import { SessionService } from './security/session.service';
import { navigationBiomedic } from './navigation/navigation-biomedic';
import { navigationEmployee } from './navigation/navigation-employee';
import { navigationSupervisor } from './navigation/navigation-supervisor';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  ]
})
export class AppComponent {

  navigation: any;
  projectName = environment.title;

  constructor(private _session: SessionService) { 
    this.navigation = this.selecionarMenu();
  }

  isLogged(): boolean {
    return sessionStorage.length !== 0;
  }

  selecionarMenu() {
          switch(sessionStorage.getItem('permision')){
              case 'F':
                  return navigationEmployee;
              case 'S':
                  return navigationSupervisor;
              default:
                  return navigationBiomedic;
          }
      }

}
