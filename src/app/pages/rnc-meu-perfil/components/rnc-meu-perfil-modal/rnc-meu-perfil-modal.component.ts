import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { UserName } from 'src/app/models/user-name.enum';
import { SessionService } from 'src/app/security/session.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'meu-perfil-modal',
  templateUrl: './rnc-meu-perfil-modal.component.html',
  styleUrls: ['./rnc-meu-perfil-modal.component.css'],
})
export class RncMeuPerfilModalComponent implements OnInit {
  meuPerfilForm: FormGroup;
  userEmail: string;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RncMeuPerfilModalComponent>,
    private alert: AlertComponent,
    private _userService: UserService,
    private _sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.userEmail = data;
  }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.meuPerfilForm = this._formBuilder.group({
      newName: [null, Validators.required],
      email: [this.userEmail],
    });
  }

  atualizarNome() {
    if (this.meuPerfilForm.valid) {
      this._userService.atualizarUsuario(this.meuPerfilForm.value).subscribe(
        () => {
          this._sessionService.set('completeName', this.meuPerfilForm.value.newName);
          let user: any = JSON.parse(sessionStorage.getItem('user'));
          user.completeName = this.meuPerfilForm.value.newName;
          sessionStorage.setItem('user', JSON.stringify(user));
          this.alert.show('Atualização', 'Sua nome foi alterado com sucesso!', 'success');
          this.dialogRef.close(this.meuPerfilForm.value.newName);
        }, error => this.alert.show('Erro', error.error, 'warning')
      );
    } else {
      this.alert.show('Atenção', 'Por favor, preencha o campo!', 'warning');
    }
  }
}
