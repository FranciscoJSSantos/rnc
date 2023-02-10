import { Component, Inject, OnInit } from '@angular/core';
import { RootObject } from 'src/app/models/satisfaction-survey';
import { SatisfactionSurveyService } from 'src/app/services/satisfaction-survey.service';
import { SatisfactionSurveyDetails } from 'src/app/models/satisfaction-survey-details';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-rnc-modal-satisfaction-survey',
  templateUrl: './rnc-modal-satisfaction-survey.component.html',
  styleUrls: ['./rnc-modal-satisfaction-survey.component.css']
})
export class RncModalSatisfactionSurveyComponent implements OnInit {

  survey: SatisfactionSurveyDetails = {} as SatisfactionSurveyDetails;

  constructor(
    private _satisfactionSurveyService: SatisfactionSurveyService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.survey = data;
  }

  ngOnInit(): void {
  }

  getSatisfactionSurveyInformation(surveyId: string){
    this._satisfactionSurveyService.satisfactionSurveyId(surveyId)
      .subscribe((survey) => {
        this.survey = survey;
      })
  }
}
