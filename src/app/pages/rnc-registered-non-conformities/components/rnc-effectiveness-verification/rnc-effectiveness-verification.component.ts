import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EffectivenessService } from 'src/app/services/effectiveness.service';
import { AlertComponent } from './../../../../components/alert/alert.component';
import { Effectiveness } from './../../../../models/effectiveness';

@Component({
  selector: 'app-rnc-effectiveness-verification',
  templateUrl: './rnc-effectiveness-verification.component.html',
  styleUrls: ['./rnc-effectiveness-verification.component.css'],
})
export class RncEffectivenessVerificationComponent implements OnInit {
  description: FormControl = new FormControl(null, Validators.required);
  occurrenceRegisterId: string;

  constructor(
    private _effectivenessService: EffectivenessService,
    private _formBuilder: FormBuilder,
    private _alert: AlertComponent,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) id: string
  ) {
    this.occurrenceRegisterId = id;
  }

  ngOnInit(): void {}

  verifyEffectiveness() {
    //form não está lendo POST
    //pull master
    if (this.description.valid) {
      this._alert.show('Verificado', 'Verificado com sucesso!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    //   this._effectivenessService.verifyEffectiveness(
    //     {
    //       occurrenceRegisterId: this.occurrenceRegisterId,
    //       description: this.description.value
    //     }
    //   ).subscribe(() => {

    //   }, error => this._alert.show('Erro', error.error, 'error'))
    // } else {
    //   this._alert.show('Atenção', 'Por favor, Preencha todos os campos', 'warning')
    // }
  }
}
