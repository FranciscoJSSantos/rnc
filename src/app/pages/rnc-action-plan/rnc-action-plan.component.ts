import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionPlan } from 'src/app/models/action-plan';
import { ActionPlanService } from 'src/app/services/action-plan.service';
import { RncPlanComponent } from './components/rnc-plan/rnc-plan.component';

@Component({
  selector: 'rnc-action-plan',
  templateUrl: './rnc-action-plan.component.html',
  styleUrls: ['./rnc-action-plan.component.css']
})
export class RncActionPlanComponent implements OnInit {

  actionsPlans: ActionPlan[] = [];

  constructor(
    private dialog: MatDialog,
    private _actionPlanService: ActionPlanService,
  ) {

  }

  ngOnInit(): void {
    this.getAllActionsPlans();
  }

  detalhePlanodeAcao(actionsPlansId: number) {
    let dialogRef = this.dialog.open(
      RncPlanComponent,
      { data: actionsPlansId }
    );
    dialogRef.afterClosed();
  }

  getAllActionsPlans() {
    this._actionPlanService.findAllActionPlan().subscribe(
      (actionsPlans) => {
        this.actionsPlans = actionsPlans;
      });
  }

}
