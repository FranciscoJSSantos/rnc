import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { SetorService } from 'src/app/services/setor.service';
import { UserService } from 'src/app/services/user.service';
import { Setor } from './../../../models/setor.model';
// import { ErrorStateMatcher } from '@angular/material/core';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'rnc-register',
  templateUrl: './rnc-register.component.html',
  styleUrls: ['./rnc-register.component.css'],
})

export class RncRegisterComponent implements OnInit {

  setores: Setor[] = [];
  registerForm: FormGroup;
  disableSelect = new FormControl(false);
  // matcher = new MyErrorStateMatcher();
  profiles: { label: string, value: string }[] = [
    {
      label: 'Funcionário',
      value: 'Employee'
    },
    {
      label: 'Responsável do Setor',
      value: 'ResponsibleFS'
    },
    {
      label: 'Responsável Técnico',
      value: 'ResponsibleT'
    },
    {
      label: 'Analista da Qualidade',
      value: 'QualityAnalist'
    }
  ];

  constructor(
    private _forBuilder: FormBuilder,
    private _userService: UserService,
    private _setorService: SetorService,
    private _alert: AlertComponent,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this.criarForm();
    this.findAllSetor();
  }

  load() {
    location.reload()
  }

  criarForm() {
    this.registerForm = this._forBuilder.group({
      completeName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      enrollment: [null, Validators.required],
      setor: [null, Validators.required],
      password: [null, [Validators.required, confirmPasswordValidator]],
      confirmPassword: [null, [Validators.required, confirmPasswordValidator]],
      userPermission: [null, Validators.required]
    })
  }

  save() {
    if (this.registerForm.valid) {
      this._userService.save(this.registerForm.value)
        .subscribe(() => {
          this._alert.show('Cadastro', 'Usuário cadastrado com sucesso!', 'success');
          this._router.navigateByUrl('/login');
        }, error => this._alert.show('Erro', error.error, 'error'),
        )
    } else {
      this._alert.show('Atenção', 'Por favor, preencha todos os campos!', 'warning')
    }
  }

  findAllSetor() {
    this._setorService.getAllSetor()
      .subscribe(setores => {
        this.setores = setores;
      }, error => {
        this._alert.show('Erro', error.error, 'error');
      })
  }

}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirmPassword');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (password.value === '' && passwordConfirm.value === '') {
    password.setErrors({ passwordsNotMatching: false });
    password.setErrors({ required: true });
  }

  if (password.value === passwordConfirm.value && password.value !== '' && passwordConfirm.value !== '') {
    password.setErrors({ passwordsNotMatching: false });
    password.setErrors(null);

    passwordConfirm.setErrors({ passwordsNotMatching: false });
    passwordConfirm.setErrors(null);
    return null;
  }


  if (password.value !== '' && password.value !== passwordConfirm.value) {
    password.setErrors({ passwordsNotMatching: true });
    passwordConfirm.setErrors({ passwordsNotMatching: true });
    return { passwordsNotMatching: true };

  }

  if (password.value === '' && passwordConfirm.value !== '') {
    password.setErrors({ required: true });
    passwordConfirm.setErrors({ passwordsNotMatching: true });
  }
};