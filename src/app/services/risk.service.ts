import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpOptionsService } from './../security/http-options.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Risk } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(
    private _http: HttpClient,
    private _httpOptions: HttpOptionsService) { }

    getAllRisk(): Observable<any> {
      return this._http.get<Risk[]>(environment.url + '/api/OccurrenceRisk', this._httpOptions.getHttpOptionsWithAuthorization());
    }
}
