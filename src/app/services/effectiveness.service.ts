import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Effectiveness } from '../models/effectiveness';
import { HttpOptionsService } from './../security/http-options.service';

@Injectable({
  providedIn: 'root',
})
export class EffectivenessService {
  constructor(
    private _http: HttpClient,
    private _httpOptions: HttpOptionsService
  ) {}

  verifyEffectiveness(effectiveness: Effectiveness): Observable<any> {
    return this._http.post<boolean>(
      environment.url +
        '​/api/AssessOccurrenceRegister/VerificationOfEffectiveness',
      JSON.stringify(effectiveness)
    );
  }
}
