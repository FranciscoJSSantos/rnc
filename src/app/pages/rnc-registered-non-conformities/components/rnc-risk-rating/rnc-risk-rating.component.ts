import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Risk } from 'src/app/models/risk';
import { ActionPlanService } from 'src/app/services/action-plan.service';
import { RiskService } from 'src/app/services/risk.service';

@Component({
  selector: 'app-rnc-risk-rating',
  templateUrl: './rnc-risk-rating.component.html',
  styleUrls: ['./rnc-risk-rating.component.css']
})
export class RncRiskRatingComponent implements OnInit {

  risks: Risk[] = [];
  riskId: number;
  risksForm: FormControl;

  constructor(
    private _riskService: RiskService,
    private _alert: AlertComponent,
    private _actionPlanService: ActionPlanService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) id: number
  ) {
     this.riskId = id;
  }

  ngOnInit(): void {
    this.findAllRisk();
    this.createForm();
  }

  createForm(){
    this.risksForm = this._formBuilder.control(null, Validators.required);
  }

  findAllRisk() {
    this._riskService.getAllRisk()
      .subscribe(risks => {
        this.risks = risks;
      }, error => {
        this._alert.show('Erro', error.error, 'error');
      })
  }

  analyzeRiskCause() {
    if (this.risksForm.valid) {
      this._actionPlanService.analyzeRisk(
        {
          occurrenceRegisterId: this.riskId,
          occurenceRisk: this.risksForm.value
        }
      ).subscribe(() => {
        this._alert.show('Classificado', 'Classificada com sucesso!', 'success');
        setTimeout(() => {window.location.reload();}, 1500);
      }, error => this._alert.show('Erro', error.error, 'error'))
    } else {
      this._alert.show('Atenção', 'Por favor, Preencha todos os campos', 'warning')
    }
  }

}
