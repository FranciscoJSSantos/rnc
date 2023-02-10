import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SatisfactionSurveyDetails } from 'src/app/models/satisfaction-survey-details';
import { SatisfactionSurveyService } from 'src/app/services/satisfaction-survey.service';
import { RncModalSatisfactionSurveyComponent } from './components/rnc-modal-satisfaction-survey/rnc-modal-satisfaction-survey.component';

@Component({
  selector: 'card-of-satisfaction-survey',
  templateUrl: './rnc-card-of-satisfaction-survey.component.html',
  styleUrls: ['./rnc-card-of-satisfaction-survey.component.css']
})
export class RncCardOfSatisfactionSurveyComponent implements OnInit {

  teste: 'teste';
  surveys: SatisfactionSurveyDetails[] = [];
  constructor(
    private dialog: MatDialog,
    private _satisfactionSurveyService: SatisfactionSurveyService
  ) { }

  ngOnInit(): void {
    this.getSatisfactionSurvey();
  }

  abrirModaldeSatisfacao(id: string) {
    this.dialog.open(
      RncModalSatisfactionSurveyComponent,
      { data: id }
    );
  }

  getSatisfactionSurvey(){
    this._satisfactionSurveyService.satisfactionSurveyAll()
      .subscribe((survey) => {
        this.surveys = survey;
      });
  }

  getSatisfactionSurveyInformations(surveyId: string){
    this._satisfactionSurveyService.satisfactionSurveyId(surveyId)
      .subscribe((survey) => {
        let dialogRef = this.dialog.open(
          RncModalSatisfactionSurveyComponent,
        { data: survey }
        );
      dialogRef.afterClosed();
      });
  }

  detalheSatisfactionSurvey(surveyId: string) {
    let dialogRef = this.dialog.open(
      RncModalSatisfactionSurveyComponent,
      { data: surveyId }
    );
    dialogRef.afterClosed();
  }

}
