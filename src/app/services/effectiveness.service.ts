import { HttpOptionsService } from './../security/http-options.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effectiveness } from '../models/effectiveness';

@Injectable({
  providedIn: 'root'
})
export class EffectivenessService {

  constructor(
    private _http: HttpClient,
    private _httpOptions: HttpOptionsService
  ) { }

  verifyEffectiveness(effectiveness: Effectiveness): Observable<any>{
    return this._http.post<boolean>(environment.url + '​/api/AssessOccurrenceRegister/VerificationOfEffectiveness', JSON.stringify(effectiveness), this._httpOptions.getHttpOptionsWithAuthorization())
  }
}
