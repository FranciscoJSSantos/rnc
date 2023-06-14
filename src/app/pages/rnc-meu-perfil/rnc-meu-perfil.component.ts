import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { RncMeuPerfilModalPasswordComponent } from './components/rnc-meu-perfil-modal-password/rnc-meu-perfil-modal-password.component';
import { RncMeuPerfilModalComponent } from './components/rnc-meu-perfil-modal/rnc-meu-perfil-modal.component';
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

      this.user = {
        "id": 1,
          "completeName":" Francisco José",
          "email": "francisco.jsantos@souunit.com",
          "enrollment": "1191119685",
          "setor": "Coleta",
          "ativo": true,
          "password": "123",
          "confirmPassword": "123",
          "userPermission": "BIOMEDICAL" }
  
 
  }

  menuOpened() {
    this.menuIsOpen = true;
  }

  menuClosed() {
    this.menuIsOpen = false;
  }
}

