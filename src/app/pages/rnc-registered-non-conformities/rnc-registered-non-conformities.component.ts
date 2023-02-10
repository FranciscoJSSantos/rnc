import { FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { NonConformitieDetail } from 'src/app/models/non-conformitie-detail';
import { NonConformitieService } from 'src/app/services/non-conformitie.service';
import { RncRegisteredNonConformitiesModalComponent } from './components/rnc-registered-non-conformities-modal/rnc-registered-non-conformities-modal.component';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { NonConformitieRegister, Occurrence } from 'src/app/models/non-conformitie-register';

@Component({
  selector: 'registered-non-conformities',
  templateUrl: './rnc-registered-non-conformities.component.html',
  styleUrls: ['./rnc-registered-non-conformities.component.css'],
})
export class RncRegisteredNonConformitiesComponent implements OnInit {
  occurrences: NonConformitieDetail[] = [];
  occurrenceRegister: NonConformitieRegister[] = [];
  public selectedFilters: any = null;
  public isGroupSelected: boolean = false;
  filterControl = new FormControl();
  filterGroups: any[] = [
    {
      name: "Finalizado",
      filter: [
        { viewValue: "Todos", group: "Finished", viewGroup: "Finalizado"},
      ]
    },
    {
      name: "Não Finalizado",
      filter: [
        { value: "RootCauseAnalysisAndActionPlan", viewValue: "Análise de Causa Raíz", group: "NotFinished", viewGroup: "Não Finalizado" },
        { value: "RiskRating", viewValue: "Análise de Risco", group: "NotFinished", viewGroup: "Não Finalizado" },
        { value: "VerificationOfEffectiveness", viewValue: "Análise de Efetividade", group: "NotFinished", viewGroup: "Não Finalizado" },
        { value: "All", viewValue: "Todos", group: "NotFinished", viewGroup: "Não Finalizado" }
      ]
    },
    {
      name: "Todos",
      filter: [
        { value: "RootCauseAnalysisAndActionPlan", viewValue: "Análise de Causa Raíz", group: "All", viewGroup: "Todos" },
        { value: "RiskRating", viewValue: "Análise de Risco", group: "All", viewGroup: "Todos" },
        { value: "VerificationOfEffectiveness", viewValue: "Análise de Efetividade", group: "All", viewGroup: "Todos" },
        { value: "All", viewValue: "Todos", group: "All", viewGroup: "Todos" }
      ]
    },
    {
      name: "Situação",
      filter: [
        { isDelayed: "True", viewValue: "Com atraso"},
        { isDelayed: "False", viewValue: "Sem atraso"}
      ]
    },

  ]
  @ViewChild('menu') menu: any;

  constructor(
    private dialog: MatDialog,
    private _occurrenceService: NonConformitieService,
    private _alert: AlertComponent
  ) { }

  ngOnInit(): void {
    this.getRegisteredOccurrences();
  }

  detalheOccurrence(occurrenceId: string) {
    this._occurrenceService.findOccurrenceById(occurrenceId)
      .subscribe((occurrence) => {
        let dialogRef = this.dialog.open(
          RncRegisteredNonConformitiesModalComponent,
          { data: occurrence }
        );
        dialogRef.afterClosed().subscribe(() => this.filtrarOccurrence(this.selectedFilters[0]));
      });
  }

  filtrarOccurrence(filters: any) {
    let query = "";

    if (filters && filters.length === 0) {
      this.selectedFilters = null;
      this.isGroupSelected = false;
      this._occurrenceService.findOccurrenceByFilters(null)
        .subscribe((occurrences) => {
          this.occurrences = occurrences;
        });
    } else {
      this.selectedFilters = filters;
      this.isGroupSelected = false;


      if (filters[0].isDelayed){

        query = `AnalyseFilter=All&isDelayed=${filters[0].isDelayed}`

      } else {

        query += "AnalyseFilter=" + filters[0].group;

        filters.forEach(filter => {
          if (filter.value !== 'All' && filter.value !== undefined){
            query += `&PendingFilter=${filter.value}`;
        }
          if (filter.isDelayed){
            query += `&isDelayed=${filter.isDelayed}`
        }
        });
    }
      this._occurrenceService.
        findOccurrenceByFilters(query)
        .subscribe((occurrences) => {
          this.occurrences = occurrences;
        });
    }
  }

  getRegisteredOccurrences() {
    this._occurrenceService.findAllOccurrence()
      .subscribe((occurrence) => {
        this.occurrences = occurrence;
      });
  }

  getRegisteredOccurrencesInformations(occurrenceId: string) {
    this._occurrenceService.findOccurrenceById(occurrenceId)
      .subscribe((occurrence) => {
        return occurrence;
      });
  }

  validDate(occurrence: any) {
    const date = new Date(occurrence.date);
    date.setDate(date.getDate());
    return new Date() < date;
  }

  removeClassification(occurrence: NonConformitieDetail) {
    this._alert.confirmacao("Confirmação", "Deseja remover essa ocorrência?", "Confirmar", "A ocorrência foi removida", "Removida")
      .then(() => {
        this._occurrenceService.deleteOccurrence(occurrence.id).subscribe(() => {
          this.occurrences.splice(this.occurrences.indexOf(occurrence), 1);
        }, error => this._alert.show('Remoção', error.error, 'error'))
      })
      .catch(() => false);
  }
}
