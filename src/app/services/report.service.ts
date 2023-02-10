import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './../security/http-options.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private _http: HttpClient,
    private _httpOptions: HttpOptionsService) { }

  findReportById(OccurrenceRegisterId: string): Observable<any> {
      return this._http.get<any>(environment.url + '/api/Report/' + OccurrenceRegisterId, this._httpOptions.getHttpOptionsWithAuthorizationWithText());
  }

  sendReportEmailById(OccurrenceRegisterId: string): Observable<any> {
    return this._http.get<any>(environment.url + '/api/Report/email/' + OccurrenceRegisterId, this._httpOptions.getHttpOptionsWithAuthorization());
}
}
