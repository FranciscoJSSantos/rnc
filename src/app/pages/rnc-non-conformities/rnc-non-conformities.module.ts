import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RncNonConformitiesRoutingModule } from './rnc-non-conformities-routing.module';
import { MatInputModule } from '@angular/material/input';
import { RncNonConformitiesComponent } from './rnc-non-conformities.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    RncNonConformitiesComponent,
    // AlertComponent
  ],
  imports: [
    CommonModule,
    RncNonConformitiesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    FileUploadModule
  ],
  providers: [
    // MatDatepickerModule,
    // { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]

})
export class RncNonConformitiesModule { }
