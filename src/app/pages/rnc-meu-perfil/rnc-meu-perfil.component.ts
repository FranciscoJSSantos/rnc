import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RncMeuPerfilModalComponent } from './components/rnc-meu-perfil-modal/rnc-meu-perfil-modal.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { RncMeuPerfilModalPasswordComponent } from './components/rnc-meu-perfil-modal-password/rnc-meu-perfil-modal-password.component';
@Component({
  selector: 'meu-perfil',
  templateUrl: './rnc-meu-perfil.component.html',
  styleUrls: ['./rnc-meu-perfil.component.css'],
})
export class RncMeuPerfilComponent implements OnInit {
  menuIsOpen: boolean = false;
  user: User = {} as User;


  constructor(
    private dialog: MatDialog,
    private _userService: UserService
  ) {  }

  ngOnInit(): void {
    this.getUser();
  }

  atualizarMeuPerfil() {
    let dialogRef = this.dialog.open(RncMeuPerfilModalComponent, {data: this.user.email});
    dialogRef.afterClosed()
      .subscribe(response => {
        if(response) {
          this.user.completeName = response;
        }
      });
  }

  atualizarMinhaSenha(){
    this.dialog.open(RncMeuPerfilModalPasswordComponent, {data: this.user.email});
  }

  getUser() {
    let userSession: User = JSON.parse(sessionStorage.getItem('user')) as User;
    this._userService.findUserById(userSession.email).subscribe((user) => {
      this.user = user;
    });
  }

  menuOpened() {
    this.menuIsOpen = true;
  }

  menuClosed() {
    this.menuIsOpen = false;
  }
}

