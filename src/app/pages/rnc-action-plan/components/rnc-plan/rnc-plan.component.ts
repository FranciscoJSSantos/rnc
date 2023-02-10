import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionPlan } from 'src/app/models/action-plan';
import { ActionPlanService } from 'src/app/services/action-plan.service';

@Component({
  selector: 'app-rnc-plan',
  templateUrl: './rnc-plan.component.html',
  styleUrls: ['./rnc-plan.component.css']
})
export class RncPlanComponent implements OnInit {

  actionsPlans: ActionPlan = {} as ActionPlan;
  actionPlanForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _actionPlanService: ActionPlanService,
    @Inject(MAT_DIALOG_DATA) data: number
  ) {
    this.getActionPlanInformations(data);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.actionPlanForm = this._formBuilder.group({
      id: [null],
      name: [null],
      questions: this._formBuilder.array([])
    });
  }

  getActionPlanInformations(actionPlanId: number) {
    this._actionPlanService.findActionPlanById(actionPlanId)
      .subscribe((actionsPlans) => {
        this.actionsPlans = actionsPlans;
      })
  }

}
