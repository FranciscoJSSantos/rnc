import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpOptionsService } from './../security/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private _http: HttpClient,
    private _httpOptions: HttpOptionsService) { }

  findChart(setor: number, month: number): Observable<any> {
      return this._http.get<any>(environment.url + '/api/Chart/' + setor + '/' + month);
  }

  sendChartEmailById(setor: number, month: number): Observable<any> {
    return this._http.get<any>(environment.url + '/api/Chart/email/' + setor + '/' + month);
}
}
