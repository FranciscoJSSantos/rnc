import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NonConformitieService } from 'src/app/services/non-conformitie.service';
import { RncRiskRatingComponent } from '../rnc-risk-rating/rnc-risk-rating.component';
import { RncRootCauseAnalysisComponent } from '../rnc-root-cause-analysis/rnc-root-cause-analysis.component';
import { NonConformitieDetail } from './../../../../models/non-conformitie-detail';
import { RncEffectivenessVerificationComponent } from './../rnc-effectiveness-verification/rnc-effectiveness-verification.component';

@Component({
  selector: 'rnc-registered-non-conformities-modal',
  templateUrl: './rnc-registered-non-conformities-modal.component.html',
  styleUrls: ['./rnc-registered-non-conformities-modal.component.css']
})
export class RncRegisteredNonConformitiesModalComponent implements OnInit {

  occurrence: NonConformitieDetail = {} as NonConformitieDetail;
  archives: any[] = [];

  constructor(
    private occurrenceService: NonConformitieService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.occurrence = data;
  }

  ngOnInit(): void {
  }

  getRegisteredOccurrencesInformations(occurrenceId: string) {
    this.occurrenceService.findOccurrenceById(occurrenceId)
      .subscribe((occurrence) => {
        this.occurrence = occurrence;
      });
  }

  analisarOccurrence(id: string) {
    this.dialog.open(
      RncRootCauseAnalysisComponent,
      { data: id }
    );
  }

  classificacaoDeRisco(id: string) {
    this.dialog.open(
      RncRiskRatingComponent,
      { data: id }
    );
  }
  verificacaoDeEficacia(id: string) {
    this.dialog.open(
      RncEffectivenessVerificationComponent,
      { data: id }
    );
  }

}
