import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpOptionsService } from './../security/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private _http: HttpClient,
    private _httpOptions: HttpOptionsService) { }

  findReportById(OccurrenceRegisterId: string): Observable<any> {
      return this._http.get<any>(environment.url + '/api/Report/' + OccurrenceRegisterId);
  }

  sendReportEmailById(OccurrenceRegisterId: string): Observable<any> {
    return this._http.get<any>(environment.url + '/api/Report/email/' + OccurrenceRegisterId);
}
}
