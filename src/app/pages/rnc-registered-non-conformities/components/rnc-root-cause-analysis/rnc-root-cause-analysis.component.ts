import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStep } from '@angular/material/stepper';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ActionPlan } from 'src/app/models/action-plan';
import { ActionPlanCombo } from 'src/app/models/action-plan-combo';
import { FiveWhat } from 'src/app/models/five-what';
import { NonConformitieDetail } from 'src/app/models/non-conformitie-detail';
import { ActionPlanService } from 'src/app/services/action-plan.service';
import { NonConformitieService } from 'src/app/services/non-conformitie.service';
import { SetorService } from 'src/app/services/setor.service';

@Component({
  selector: 'app-rnc-root-cause-analysis',
  templateUrl: './rnc-root-cause-analysis.component.html',
  styleUrls: ['./rnc-root-cause-analysis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RncRootCauseAnalysisComponent implements OnInit {
  fiveWhat: FormGroup;
  actionPlanForm: FormGroup;
  ocurrenceId: number;
  actionPlans: ActionPlanCombo[] = [];
  actionPlan: ActionPlan = {} as ActionPlan;
  five: FiveWhat[] = [];
  occurrences: NonConformitieDetail[] = [];
  @ViewChild('step2') step: MatStep;

  constructor(
    private dialog: MatDialog,
    private _actionPlanService: ActionPlanService,
    private _formBuilder: FormBuilder,
    private _alert: AlertComponent,
    private _occurrencesService: NonConformitieService,
    private _setorService: SetorService,
    private _cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) id: number
  ) {
    this.ocurrenceId = id;
  }

  ngOnInit(): void {
    this.createForm();
    this.findAllActionPlan();
  }

  isMobile(): boolean {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    }
    return false;
  }

  //formArray sozinho (5pqs) e na hora de enviar (criar função para formatar)
  createForm() {
    this.fiveWhat = this._formBuilder.group({
      what: this.createFiveWhat(),
    });
    this.actionPlanForm = this._formBuilder.group({
      id: [null, Validators.required],
      name: [null],
      questions: this._formBuilder.array([], Validators.required),
    });
  }

  createFiveWhat() {
    return this._formBuilder.array(
      [
        this._formBuilder.group({
          what: [null, Validators.required],
        }),
        this._formBuilder.group({
          what: [null, Validators.required],
        }),
        this._formBuilder.group({
          what: [null, Validators.required],
        }),
        this._formBuilder.group({
          what: [null, Validators.required],
        }),
        this._formBuilder.group({
          what: [null, Validators.required],
        }),
      ],
      Validators.required
    );
  }

  setNameActionPlan() {
    let actionPlan = this.actionPlans.filter(
      (actionPlan) => actionPlan.id === this.actionPlanForm.value.id
    )[0];
    this.actionPlanForm.patchValue({ name: actionPlan.name });
  }

  findActionPlanById(id: number) {
    this._actionPlanService.findActionPlanById(id).subscribe((actionPlan) => {
      this.actionPlan = actionPlan;
      let formArray: FormArray = this.actionPlanForm.get(
        'questions'
      ) as FormArray;
      formArray.clear();
      this.actionPlan.questions.forEach((question) => {
        (this.actionPlanForm.get('questions') as FormArray).push(
          this._formBuilder.group({
            id: [question.id],
            value: [question.value],
            actionPlanId: [question.actionPlainId],
            response: [null, Validators.required],
          })
        );
      });
      this.actionPlanForm.updateValueAndValidity();
      this._cd.detectChanges();
    });
  }

  findAllActionPlan() {
    this._actionPlanService.findAllActionPlan().subscribe((actionPlans) => {
      this.actionPlans = actionPlans;
      this.actionPlanForm.patchValue({
        id: this.actionPlans[0].id,
        name: this.actionPlans[0].name,
      });
      this.findActionPlanById(this.actionPlans[0].id);
    });
  }

  analyzeRootCause(id: string) {
    if (this.actionPlanForm.valid) {
      this._alert.show('Analisado', 'Analisado com sucesso!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    //   this._actionPlanService.analyzeRootCause(
    //     {
    //       occurrenceRegisterId: this.ocurrenceId,
    //       fiveWhat: this.fiveWhat.get('what').value,
    //       actionPlain: this.actionPlanForm.value
    //     }
    //   ).subscribe(() => {
    //     this._alert.show('Analisado', 'Analisado com sucesso!', 'success');
    //     setTimeout(() => {window.location.reload();}, 1500);
    //   }, error => this._alert.show('Erro', error.error, 'error'))
    // } else {
    //   this._alert.show('Atenção', 'Por favor, Preencha todos os campos', 'warning')
    // }
  }
}
