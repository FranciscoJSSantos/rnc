import { PermissionGuard } from './guards/permission.guard';
import { RncRegisteredNonConformitiesComponent } from './pages/rnc-registered-non-conformities/rnc-registered-non-conformities.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RncForgotPasswordComponent } from './pages/authentication/rnc-forgot-password/rnc-forgot-password.component';
import { RncLoginComponent } from './pages/authentication/rnc-login/rnc-login.component';
import { RncRegisterComponent } from './pages/authentication/rnc-register/rnc-register.component';
import { RncRegistrationApprovalComponent } from './pages/authentication/rnc-registration-approval/rnc-registration-approval.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RncMeuPerfilComponent } from './pages/rnc-meu-perfil/rnc-meu-perfil.component';
import { Permission } from './models/permision.enum';
import { Error500Component } from './pages/error500/error500.component'
import { RncSatisfactionSurveyComponent } from './pages/rnc-satisfaction-survey/rnc-satisfaction-survey.component';
import { RncCardOfSatisfactionSurveyComponent } from './pages/rnc-card-of-satisfaction-survey/rnc-card-of-satisfaction-survey.component';

const routes: Routes = [
  {
    path: "login",
    component: RncLoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "register",
    component: RncRegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "forgot-password",
    component: RncForgotPasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'registration-approval',
    data: {
      permissions: [Permission.ANALISTA_DA_QUALIDADE]
    },
    canActivateChild: [PermissionGuard],
    children: [
      {
        path: '',
        component: RncRegistrationApprovalComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'meu-perfil',
    component: RncMeuPerfilComponent
  },
  {
    path: 'occurrences', //trocar nome da pasta
    loadChildren: () => import('./pages/rnc-non-conformities/rnc-non-conformities.module').then(m => m.RncNonConformitiesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '4lab-report-analysis',
    loadChildren: () => import('./pages/rnc-report-analysis/rnc-report-analysis.module').then(m => m.RncReportAnalysisModule),
    canActivate: [AuthGuard]
  },
  {
    path: '4lab-chart',
    loadChildren: () => import('./pages/rnc-chart/rnc-chart.module').then(m => m.RncChartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registered-non-conformities',
    data: {
      permissions: [Permission.ANALISTA_DA_QUALIDADE, Permission.RESPONSAVEL_DO_SETOR, Permission.RESPONSAVEL_TECNICO]
    },
    canActivateChild: [PermissionGuard],
    children: [
      {
        path: '',
        component: RncRegisteredNonConformitiesComponent
      }
    ]
  },
  {
    path: '4lab-action-plan',
    component: Error500Component
    //component: RncActionPlanComponent
  },
  {
    path: '4lab-register-action-plan',
    component: Error500Component
    //component: RncRegisterActionPlanComponent
  },
  // {
  //   path: '4lab-report',
  //   component: RncReportComponent
  // },
  {
    path: 'error500',
    component: Error500Component
  },
  {
    path: 'satisfaction-survey',
    component: RncSatisfactionSurveyComponent
  },
  {
    path: 'card-of-satisfaction-survey',
    component: RncCardOfSatisfactionSurveyComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
