import { RncRegisteredNonConformitiesModalComponent } from './pages/rnc-registered-non-conformities/components/rnc-registered-non-conformities-modal/rnc-registered-non-conformities-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RncFooterComponent } from './layout/components/rnc-footer/rnc-footer.component';
import { RncHeaderComponent } from './layout/components/rnc-header/rnc-header.component';
import { RncSidenavComponent } from './layout/components/rnc-sidenav/rnc-sidenav.component';
import { RncForgotPasswordComponent } from './pages/authentication/rnc-forgot-password/rnc-forgot-password.component';
import { RncLoginComponent } from './pages/authentication/rnc-login/rnc-login.component';
import { RncRegisterComponent } from './pages/authentication/rnc-register/rnc-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtServiceService } from './security/jwt-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RncRegistrationApprovalComponent } from './pages/authentication/rnc-registration-approval/rnc-registration-approval.component';
import { MatSelectModule } from '@angular/material/select';
import { RncMeuPerfilComponent } from './pages/rnc-meu-perfil/rnc-meu-perfil.component';
import { RncMeuPerfilModalComponent } from './pages/rnc-meu-perfil/components/rnc-meu-perfil-modal/rnc-meu-perfil-modal.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { RncNonConformitiesModule } from './pages/rnc-non-conformities/rnc-non-conformities.module';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { SetorService } from './services/setor.service';
import { RncRegisteredNonConformitiesComponent } from './pages/rnc-registered-non-conformities/rnc-registered-non-conformities.component';
import { RncMeuPerfilModalPasswordComponent } from './pages/rnc-meu-perfil/components/rnc-meu-perfil-modal-password/rnc-meu-perfil-modal-password.component';
import { RncAboutUsComponent } from './pages/authentication/rnc-login/components/rnc-about-us/rnc-about-us.component';
import { RncRootCauseAnalysisComponent } from './pages/rnc-registered-non-conformities/components/rnc-root-cause-analysis/rnc-root-cause-analysis.component';
import { RncActionPlanComponent } from './pages/rnc-action-plan/rnc-action-plan.component';
import { RncPlanComponent } from './pages/rnc-action-plan/components/rnc-plan/rnc-plan.component';
import { RncRegisterActionPlanComponent } from './pages/rnc-register-action-plan/rnc-register-action-plan.component';
import { FileUploadModule } from 'ng2-file-upload';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { Error500Component } from './pages/error500/error500.component';
import { MatChipsModule } from '@angular/material/chips';
import { RncRiskRatingComponent } from './pages/rnc-registered-non-conformities/components/rnc-risk-rating/rnc-risk-rating.component';
import { RiskService } from './services/risk.service';
import { OccurrenceClassificationService } from './services/occurrence-risk.service';
import { RncEffectivenessVerificationComponent } from './pages/rnc-registered-non-conformities/components/rnc-effectiveness-verification/rnc-effectiveness-verification.component';
import { RncSatisfactionSurveyComponent } from './pages/rnc-satisfaction-survey/rnc-satisfaction-survey.component';
import { RncCardOfSatisfactionSurveyComponent } from './pages/rnc-card-of-satisfaction-survey/rnc-card-of-satisfaction-survey.component';
import { RncModalSatisfactionSurveyComponent } from './pages/rnc-card-of-satisfaction-survey/components/rnc-modal-satisfaction-survey/rnc-modal-satisfaction-survey.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskModule } from 'ngx-mask';
import { ShapeColorComponent } from './pages/shape-color/shape-color.component';
registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    RncFooterComponent,
    RncHeaderComponent,
    RncSidenavComponent,
    RncLoginComponent,
    RncRegisterComponent,
    RncForgotPasswordComponent,
    RncRegistrationApprovalComponent,
    RncMeuPerfilComponent,
    RncMeuPerfilModalComponent,
    AlertComponent,
    RncRegisteredNonConformitiesComponent,
    RncRegisteredNonConformitiesModalComponent,
    RncMeuPerfilModalPasswordComponent,
    RncAboutUsComponent,
    RncRootCauseAnalysisComponent,
    RncActionPlanComponent,
    RncPlanComponent,
    RncRegisterActionPlanComponent,
    // RncReportComponent,
    Error500Component,
    RncRiskRatingComponent,
    RncEffectivenessVerificationComponent,
    RncSatisfactionSurveyComponent,
    RncCardOfSatisfactionSurveyComponent,
    RncModalSatisfactionSurveyComponent,
    ShapeColorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMaterialMultilevelMenuModule,
    MatTableModule,
    MatSelectModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatStepperModule,
    MatRadioModule,
    FormsModule,
    MatMenuModule,
    RncNonConformitiesModule,
    MatDialogModule,
    FileUploadModule,
    MatMenuModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    JwtServiceService,
    MultilevelMenuService,
    AlertComponent,
    SetorService,
    RiskService,
    OccurrenceClassificationService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
