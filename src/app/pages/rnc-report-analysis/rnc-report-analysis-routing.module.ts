import { PermissionGuard } from './../../guards/permission.guard';
import { RncReportAnalysisComponent } from './rnc-report-analysis.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permission } from 'src/app/models/permision.enum';

const routes: Routes = [
  {
    path: '',
    data: {
      permissions: [Permission.ANALISTA_DA_QUALIDADE]
    },
    canActivateChild: [PermissionGuard],
    children: [
      {
        path: '',
        component: RncReportAnalysisComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RncReportAnalysisRoutingModule { }
