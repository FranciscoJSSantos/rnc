import { AlertComponent } from './../../../../components/alert/alert.component';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators, NgForm, FormControl, RequiredValidator } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-rnc-meu-perfil-modal-password',
  templateUrl: './rnc-meu-perfil-modal-password.component.html',
  styleUrls: ['./rnc-meu-perfil-modal-password.component.css']
})
export class RncMeuPerfilModalPasswordComponent implements OnInit {

  meuPerfilPasswordForm: FormGroup;
  userEmail: string;
  matcher = new MyErrorStateMatcher();

  constructor(private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _alert: AlertComponent,
    private dialogRef: MatDialogRef<RncMeuPerfilModalPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.userEmail = data;
  }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.meuPerfilPasswordForm = this._formBuilder.group(
      {
        oldPassword: [null, Validators.required],
        newPassword: [null, [Validators.required, confirmPasswordValidator]],
        confirmNewPassword: [null, [Validators.required, confirmPasswordValidator]],
        email: [this.userEmail]
      }
    );
  }

  atualizarSenha() {
    if (this.meuPerfilPasswordForm.valid) {
      this._userService.atualizarSenha(this.meuPerfilPasswordForm.value)
        .subscribe(
          () => {
            this._alert.show(
              "Atualização",
              "Sua senha foi alterada com sucesso!",
              "success"
            );
            this.dialogRef.close();
          },
          (error) => {
            this._alert.show(
              "Erro",
              error.error,
              "error"
            );
          }
        );
    } else {
      this._alert.show('Atenção', 'Por favor, preencha todos os campos corretamente!', 'warning')
    }
  }

}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('newPassword');
  const passwordConfirm = control.parent.get('confirmNewPassword');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    password.setErrors({passwordsNotMatching: false});
    password.setErrors(null);
    passwordConfirm.setErrors({passwordsNotMatching: false});
    passwordConfirm.setErrors(null);

    return null;
  }

  password.setErrors({passwordsNotMatching: true});
  passwordConfirm.setErrors({passwordsNotMatching: true});
  return { passwordsNotMatching: true };
};

