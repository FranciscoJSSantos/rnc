import { AlertComponent } from './../../../../components/alert/alert.component';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Effectiveness } from './../../../../models/effectiveness';
import { Component, Inject, OnInit } from '@angular/core';
import { EffectivenessService } from 'src/app/services/effectiveness.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rnc-effectiveness-verification',
  templateUrl: './rnc-effectiveness-verification.component.html',
  styleUrls: ['./rnc-effectiveness-verification.component.css']
})
export class RncEffectivenessVerificationComponent implements OnInit {

  description: FormControl = new FormControl(null, Validators.required)
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

  ngOnInit(): void {

  }

  verifyEffectiveness(){
    //form não está lendo POST
    //pull master
    if (this.description.valid) {
      this._effectivenessService.verifyEffectiveness(
        {
          occurrenceRegisterId: this.occurrenceRegisterId,
          description: this.description.value
        }
      ).subscribe(() => {
        this._alert.show('Verificado', 'Verificado com sucesso!', 'success');
        setTimeout(() => {window.location.reload();}, 1500);
      }, error => this._alert.show('Erro', error.error, 'error'))
    } else {
      this._alert.show('Atenção', 'Por favor, Preencha todos os campos', 'warning')
    }
  }
}
