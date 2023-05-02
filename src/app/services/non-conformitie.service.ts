import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { environment } from './../../environments/environment.prod';
import { NonConformitieDetail } from './../models/non-conformitie-detail';
import { NonConformitieRegister } from './../models/non-conformitie-register';
import { HttpOptionsService } from './../security/http-options.service';

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
    return this._http.post<boolean>(environment.url + '/api/OccurrenceRegister', JSON.stringify(occurrence));
  }

  findAllOccurrence(): Observable<any> {
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/all');
  }

  findOccurrenceById(occurrenceId: string): Observable<any> {
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/' + occurrenceId);
  }

  findOccurrenceForReport(date: any, setor: string): Observable<any> {
    console.log(date);
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/' + date + '/' + setor);
  }

  findOccurrenceByTypeId(occurrenceType: 'PreAnalitica' | 'Analitica' | 'PosAnalitica'): Observable<any> {
    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/Occurrence/' + occurrenceType);
  }

  findOccurrenceByFilters(filter: string): Observable<any> {
    let query = filter ? filter : "/";

    return this._http.get<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/all?' + query,);
  }

  findTypes(): Observable<any> {
    return this._http.get<NonConformitieRegister[]>(environment.url + '/api/OccurrenceRegister/Types');
  }

  findTypeOccurrences(): Observable<any> {
    return this._http.get<NonConformitieRegister[]>(environment.url + '/api/Occurrence');
  }

  findClassifications(): Observable<any> {
    return this._http.get<NonConformitieRegister[]>(environment.url + '/api/OccurrenceRegister/Classifications');
  }

  deleteOccurrence(occurrenceId: string): Observable<any> {
    return this._http.delete<NonConformitieDetail[]>(environment.url + '/api/OccurrenceRegister/' + occurrenceId)
  }

}
