import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ActionPlanService } from 'src/app/services/action-plan.service';

@Component({
  selector: 'rnc-register-action-plan',
  templateUrl: './rnc-register-action-plan.component.html',
  styleUrls: ['./rnc-register-action-plan.component.css']
})
export class RncRegisterActionPlanComponent implements OnInit {

  registerPlan: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _actionPlanService: ActionPlanService,
    private _alert: AlertComponent,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.registerNewQuestion();
  }

  createForm() {
    this.registerPlan = this._formBuilder.group({
      name: [null, Validators.required],
      questions: this._formBuilder.array([], Validators.required)
    })
  }

  registerNewQuestion() {
    (this.registerPlan.get('questions') as FormArray)
      .push(this._formBuilder.group({ value: [null, Validators.required] }))
  }

  deleteQuestion(i: number) {
    (this.registerPlan.get('questions') as FormArray).removeAt(i);
  }

  save() {
    this._alert.confirmacao('Plano de Ação', 'Deseja cadastrar esse plano de ação?', 'Confirmar', "O plano foi cadastrado!", "Cadastrado")
    .then(() => {
      if (this.registerPlan.valid) {
        this._actionPlanService.save(this.registerPlan.value).subscribe(() => {
          this.registerPlan.reset();
          this.createForm();
          this.registerNewQuestion();
        }, error => {
          this._alert.show('Erro', error.error, 'error');
        }
        )
      }
      else {
        this._alert.show('Atenção', 'Por favor, preencha todos os campos!', 'warning');
      }
    })
    .catch(() => false);
  }
}


