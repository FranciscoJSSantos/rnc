import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertComponent } from '../components/alert/alert.component';
import { ActionPlan } from '../models/action-plan';
import { ActionPlanCombo } from '../models/action-plan-combo';
import { ActionPlanRegister } from '../models/action-plan-register';
import { HttpOptionsService } from '../security/http-options.service';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ActionPlanService {
  constructor(
    private _http: HttpClient,
    private _alert: AlertComponent,
    private _httpOptions: HttpOptionsService
  ) {}

  findActionPlanById(id: number): Observable<any> {
    return this._http.get<ActionPlan>(
      environment.url + '/api/ActionPlain/' + id
    );
  }

  findAllActionPlan(): Observable<any> {
    return this._http.get<ActionPlanCombo[]>(
      environment.url + '/api/ActionPlain'
    );
  }

  save(actionPlan: ActionPlanRegister): Observable<any> {
    return this._http.post<boolean>(
      environment.url + '/api/ActionPlain',
      JSON.stringify(actionPlan)
    );
  }

  analyzeRootCause(actionPlan: any): Observable<any> {
    return this._http.post<boolean>(
      environment.url + '/api/AssessOccurrenceRegister/RootCauseAnalysis',
      JSON.stringify(actionPlan)
    );
  }

  analyzeRisk(actionPlan: any): Observable<any> {
    return this._http.post<boolean>(
      environment.url + '/api/AssessOccurrenceRegister/RiskAnalysis',
      JSON.stringify(actionPlan)
    );
  }
}
