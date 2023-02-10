import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RncReportAnalysisRoutingModule } from './rnc-report-analysis-routing.module';
import { RncReportAnalysisComponent } from './rnc-report-analysis.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatSelectModule } from '@angular/material/select';

@Injectable()
export class CustomDateFormatter extends CalendarNativeDateFormatter {

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date);
  }

}


@NgModule({
  declarations: [
    RncReportAnalysisComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RncReportAnalysisRoutingModule,
  ],
  exports: [
    RncReportAnalysisComponent
  ],
  providers: [
     {provide: CalendarDateFormatter, useClass: CustomDateFormatter}
  ]
})
export class RncReportAnalysisModule { }
