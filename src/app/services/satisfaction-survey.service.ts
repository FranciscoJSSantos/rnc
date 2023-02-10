import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { HttpOptionsService } from '../security/http-options.service';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { RootObject } from '../models/satisfaction-survey';
import { SatisfactionSurveyDetails } from '../models/satisfaction-survey-details';


@Injectable({
  providedIn: 'root'
})
export class SatisfactionSurveyService {

  constructor(private _http: HttpClient,
    private _alert: AlertComponent,
    private _httpOptions: HttpOptionsService) { }

  satisfactionSurvey(satisfaction: RootObject): Observable<any> {
    return this._http.post<boolean>(environment.url + '/api/SatisfactionSurvey', JSON.stringify(satisfaction), this._httpOptions.getHttpOptionsWithAuthorization())
  }
// TROCAR PARA SatisfactionSurveyDetail
  satisfactionSurveyAll(): Observable<any> {
    return this._http.get<SatisfactionSurveyDetails[]>(environment.url + '/api/SatisfactionSurvey/all', this._httpOptions.getHttpOptionsWithAuthorization());
  }

  satisfactionSurveyId(satisfaction: string): Observable<any> {
    return this._http.get<SatisfactionSurveyDetails[]>(environment.url + '/api/SatisfactionSurvey/' + satisfaction, this._httpOptions.getHttpOptionsWithAuthorization());
  }

}
