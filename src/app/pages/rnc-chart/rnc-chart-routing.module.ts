import { PermissionGuard } from './../../guards/permission.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permission } from 'src/app/models/permision.enum';
import { RncChartComponent } from './rnc-chart.component';

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
        component: RncChartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RncChartRoutingModule { }
