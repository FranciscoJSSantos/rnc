import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { JwtServiceService } from 'src/app/security/jwt-service.service';

@Component({
  selector: 'rnc-forgot-password',
  templateUrl: './rnc-forgot-password.component.html',
  styleUrls: ['./rnc-forgot-password.component.css']
})
export class RncForgotPasswordComponent implements OnInit {

  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);


  constructor(
    private _formBuilder: FormBuilder,
    private _jwtService: JwtServiceService,
    private _alert: AlertComponent
  ) { }

  ngOnInit(): void {
  }

  esqueciSenha() {
    if (this.email.valid) {
      this._jwtService.esqueciSenha(this.email.value);
      this.email.reset();
      error => this._alert.show('Erro', error.error, 'error');
    } else {
      this._alert.show('Atenção', 'Por favor, informe o seu email!', 'warning');
    }
  }
}
