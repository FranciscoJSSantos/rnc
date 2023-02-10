import { AlertComponent } from 'src/app/components/alert/alert.component';
import { SessionService } from './../../../security/session.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtServiceService } from 'src/app/security/jwt-service.service';
import { MatDialog } from '@angular/material/dialog';
import { RncAboutUsComponent } from './components/rnc-about-us/rnc-about-us.component';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'rnc-login',
  templateUrl: './rnc-login.component.html',
  styleUrls: ['./rnc-login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RncLoginComponent implements OnInit {
  FLabLoginForm: FormGroup;
  projectName = environment.title;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _jwt: JwtServiceService,
    private _session: SessionService,
    private _alert: AlertComponent,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.FLabLoginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    //temporário
    if (this.FLabLoginForm.valid) {
      this._jwt.login(this.FLabLoginForm.value);
      error => this._alert.show('Erro', error.error, 'error');
    } else {
      this._alert.show('Atenção', 'Por favor, preencha todos os campos!', 'warning');
    }
  }

  sobreNos() {
    let dialogRef = this.dialog.open(
      RncAboutUsComponent
    );
    dialogRef.afterClosed();
  }
}
