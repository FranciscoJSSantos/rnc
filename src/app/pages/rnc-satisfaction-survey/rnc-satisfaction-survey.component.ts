import { RootObject } from './../../models/satisfaction-survey';
import { Component, OnInit } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SatisfactionSurveyService } from 'src/app/services/satisfaction-survey.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: 'satisfaction-survey',
  templateUrl: './rnc-satisfaction-survey.component.html',
  styleUrls: ['./rnc-satisfaction-survey.component.css']
})
export class RncSatisfactionSurveyComponent implements OnInit {

  satisfaction: RootObject[] = [];

  reception: FormGroup;
  tecnicalArea: FormGroup;
  sanitation: FormGroup;
  deliveryResults: FormGroup;
  overallImpression: FormGroup;
  howSatisfied: FormGroup;
  ourDifferential: FormGroup;
  whySearch: FormGroup;
  personalInformations: FormGroup;

  aux: boolean = false;
  aux2: boolean = false;
  aux3: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _satisfactionSurveyService: SatisfactionSurveyService,
    private _alert: AlertComponent,
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.reception;
  }

  changeClass(){
    this.aux = !this.aux;
  }

  changeClass2(){
    this.aux2 = !this.aux2;
  }

  changeClass3(){
    this.aux3 = !this.aux3;
  }

  createForm() {
    this.reception = this._formBuilder.group({
      waitingTime: [null, Validators.required],
      attendanceAgility: [null, Validators.required],
    });

    this.tecnicalArea = this._formBuilder.group({
      waitingTime: [null, Validators.required],
      profissionalHability: [null, Validators.required],
      examOrientation: [null, Validators.required]
    });

    this.sanitation = this._formBuilder.group({
      localSanitation: [null, Validators.required]
    });

    this.deliveryResults = this._formBuilder.group({
      deliveryPunctuality: [null, Validators.required],
      deliveryResultTime: [null, Validators.required]
    });

    this.overallImpression = this._formBuilder.group({
      friendsRecommendation: [null, Validators.required]
    });

    this.howSatisfied = this._formBuilder.group({
      howSatisfiedUre: [null, Validators.required],
    });

    this.ourDifferential = this._formBuilder.group({
      Attendence: [null],
      Agility: [null],
      RapidResults: [null],
      DefferentialTreatment: [null],
      Coffe: [null],
      Localization: [null],
      Confort: [null],
      Proficinals: [null],
      Others: [null],
    });

    this.whySearch = this._formBuilder.group({
      MedicalRecommendation: [null],
      FriednOrRelatives: [null],
      Location: [null],
      Advertising: [null],
      IsuranceOption: [null],
      Others: [null],
      whereDescription: [null],
      whichDescription: [null],
      otherDescription: [null]
    });

    this.personalInformations = this._formBuilder.group({
      name: [null, Validators.required],
      number: [null, Validators.required],
      email: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  save() {
    if (this.reception.valid && this.tecnicalArea.valid && this.sanitation.value &&
      this.deliveryResults.valid && this.sanitation.valid && this.deliveryResults.valid &&
      this.overallImpression.valid && this.howSatisfied.valid && this.ourDifferential.valid &&
      this.whySearch.value && this.personalInformations.valid) {
      //Pega o valores do ourDifferential que retornam como true
      let differentials = [];
      let values = this.ourDifferential.value;
      Object.keys(values).forEach(key => {
        if (values[key] == true) differentials.push({ description: key })
      });

      //Pega o valores do whySearch que retornam como true
      let answers = [];
      let valuesWhySearch = this.whySearch.value;

      Object.keys(valuesWhySearch).forEach(key => {
        if (valuesWhySearch[key] == true) {
          const question = { researchQuestions: key, description: "" };

          if (key == "Advertising")
            question.description = valuesWhySearch.whereDescription;

          if (key == "IsuranceOption")
            question.description = valuesWhySearch.whichDescription;

          if (key == "Others")
            question.description = valuesWhySearch.otherDescription;

          answers.push(question);
        }
      });

      let satisfaction: RootObject = {
        reception: this.reception.value,
        tecnicalArea: this.tecnicalArea.value,
        sanitation: this.sanitation.value,
        deliveryResults: this.deliveryResults.value,
        overallImpression: this.overallImpression.value,
        howSatisfied: this.howSatisfied.value,
        ourDifferential: differentials,
        whySearch: answers,
        personalInformations: this.personalInformations.value
      };

      this._satisfactionSurveyService.satisfactionSurvey(satisfaction)
        .subscribe(() => {
          this._alert.show('Satisfação', 'Satisfação realizada com sucesso!', 'success');
          setTimeout(() => {window.location.reload();}, 1500);
        }, error => {
          this._alert.show('Satisfação', error.error, 'error');
        });
    }
    else {
      this._alert.show('Aviso', 'Favor marcar ou preencher os campos obrigatórios!', 'warning');
    }
  }

}
