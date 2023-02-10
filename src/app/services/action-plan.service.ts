import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { HttpOptionsService } from '../security/http-options.service';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { ActionPlan } from '../models/action-plan';
import { ActionPlanCombo } from '../models/action-plan-combo';
import { ActionPlanRegister } from '../models/action-plan-register';

@Injectable({
  providedIn: 'root'
})
export class ActionPlanService {

  constructor(private _http: HttpClient,
    private _alert: AlertComponent,
    private _httpOptions: HttpOptionsService) { }

  findActionPlanById(id: number): Observable<any> {
    return this._http.get<ActionPlan>(environment.url + '/api/ActionPlain/' + id, this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findAllActionPlan(): Observable<any> {
    return this._http.get<ActionPlanCombo[]>(environment.url + '/api/ActionPlain', this._httpOptions.getHttpOptionsWithAuthorization());
  }

  save(actionPlan: ActionPlanRegister): Observable<any> {
    return this._http.post<boolean>(environment.url + '/api/ActionPlain', JSON.stringify(actionPlan), this._httpOptions.getHttpOptionsWithAuthorization())
  }

  analyzeRootCause(actionPlan: any): Observable<any> {
    return this._http.post<boolean>(environment.url + '/api/AssessOccurrenceRegister/RootCauseAnalysis', JSON.stringify(actionPlan), this._httpOptions.getHttpOptionsWithAuthorization())
  }

  analyzeRisk(actionPlan: any): Observable<any> {
    return this._http.post<boolean>(environment.url + '/api/AssessOccurrenceRegister/RiskAnalysis', JSON.stringify(actionPlan), this._httpOptions.getHttpOptionsWithAuthorization())
  }




}
