import { Component, OnInit } from '@angular/core';
import { navigationSupervisorSetor } from 'src/app/navigation/navigation-supervisor-area';
import { SessionService } from 'src/app/security/session.service';
import { environment } from './../../../../environments/environment';
import { navigationBiomedic } from './../../../navigation/navigation-biomedic';
import { navigationEmployee } from './../../../navigation/navigation-employee';
import { navigationSupervisor } from './../../../navigation/navigation-supervisor';

@Component({
  selector: 'rnc-sidenav',
  templateUrl: './rnc-sidenav.component.html',
  styleUrls: ['./rnc-sidenav.component.css']
})
export class RncSidenavComponent implements OnInit {

  projectName = environment.title;

  constructor(private _sessionService: SessionService) { }

  ngOnInit(): void {  }

  getMenu() {
    switch (sessionStorage.getItem('permission')) {
      case 'Responsável do Setor':
        return navigationSupervisorSetor;
      case 'Responsável Técnico':
        return navigationSupervisor;
      case 'Funcionario':
        return navigationEmployee;
      default:
        return navigationBiomedic;
    }
  }

  getNome() {
    let user: any = JSON.parse(sessionStorage.getItem('user'));
    return "Chico";
    // return this._sessionService.get('completeName') ? this._sessionService.get('completeName') : user.completeName;
  }

  getPerfil() {
    return "Analista";
    // return this._sessionService.get('permission') ? this._sessionService.get('permission') : sessionStorage.getItem('permission');
  }

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'white',
    fontColor: '#172A39',
    backgroundColor: 'white',
    selectedListFontColor: '#172A39',
  };

  sidenavMode(): string {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'over' : 'side';
  }
  
}
