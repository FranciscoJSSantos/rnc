import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data.model';
import { SetorService } from 'src/app/services/setor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'rnc-registration-approval',
  templateUrl: './rnc-registration-approval.component.html',
  styleUrls: ['./rnc-registration-approval.component.css'],
})
export class RncRegistrationApprovalComponent implements OnInit {

  user: User = {} as User
  users: UserData[] = [];
  rncRegistrationApproval: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _alert: AlertComponent,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.findAllUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  approveUser(user: UserData) {
    this._alert.confirmacao("Confirmação", "Deseja aprovar este usuário?", "Confirmar", "O usuário foi aprovado!", "Aprovado")
      .then(() => {
        this._userService.approveUser(user.email).subscribe(() => {
          this.users.splice(this.users.indexOf(user), 1);
        }, error => this._alert.show('Aprovação', error.error, 'error'))
      })
      .catch(() => false);
  }

  reproveUser(user: UserData) {
    this._alert.confirmacao("Confirmação", "Deseja reprovar este usuário?", "Confirmar", "O usuário foi reprovado!", "Reprovado")
      .then(() => {
        this._userService.reproveUser(user.email).subscribe(() => {
          this.users.splice(this.users.indexOf(user), 1);
        }, error => this._alert.show('Reprovação', error.error, 'error'))
      })
      .catch(() => false);
  }

}

