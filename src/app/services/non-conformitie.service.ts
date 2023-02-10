import { NonConformitieDetail } from './../models/non-conformitie-detail';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { NonConformitieRegister } from './../models/non-conformitie-register';
import { HttpOptionsService } from './../security/http-options.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NonConformitieService {

  constructor(
    private _http: HttpClient,
    private _alert: AlertComponent,
    private _httpOptions: HttpOptionsService) {
  }


  save(occurrence: NonConformitieRegister): Observable<any> {
    return this._http.post<boolean>(environment.url + '/api/OccurrenceRegister', JSON.stringify(occurrence), this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findAllOccurrence(): Observable<any> {
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/all', this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findOccurrenceById(occurrenceId: string): Observable<any> {
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/' + occurrenceId, this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findOccurrenceForReport(date: any, setor: string): Observable<any> {
    console.log(date);
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/' + date + '/' + setor, this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findOccurrenceByTypeId(occurrenceType: 'PreAnalitica' | 'Analitica' | 'PosAnalitica'): Observable<any> {
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/Occurrence/' + occurrenceType, this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findOccurrenceByFilters(filter: string): Observable<any> {
    let query = filter ? filter : "/";

    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/all?' + query, this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findTypes(): Observable<any> {
    return this._http.get<NonConformitieRegister[]>(environment.url + '/api/OccurrenceRegister/Types', this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findTypeOccurrences(): Observable<any> {
    return this._http.get<NonConformitieRegister[]>(environment.url + '/api/Occurrence', this._httpOptions.getHttpOptionsWithAuthorization());
  }

  findClassifications(): Observable<any> {
    return this._http.get<NonConformitieRegister[]>(environment.url + '/api/OccurrenceRegister/Classifications', this._httpOptions.getHttpOptionsWithAuthorization());
  }

  deleteOccurrence(occurrenceId: string): Observable<any> {
    return this._http.delete<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/' + occurrenceId, this._httpOptions.getHttpOptionsWithAuthorization())
  }

}
