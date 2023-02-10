import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AlertComponent } from '../components/alert/alert.component';
import { OccurrenceRisk } from '../models/occurence-risk.model';
import { HttpOptionsService } from '../security/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class OccurrenceClassificationService {

  constructor(
    private _http: HttpClient,
    private _alert: AlertComponent,
    private _httpOptions: HttpOptionsService) { }

    occurrenceRiskById(OccurrenceRiskType: 'NearMiss' | ' MildAdverseEvent' | 'ModerateAdverseEvent' | 'SeriousAdverseEvent' | ' UndamagedEvent' | 'WithoutRisk' ): Observable<any> {
      return this._http.get<OccurrenceRisk[]>(environment.url + '/api/OccurrenceRisk' + OccurrenceRiskType, this._httpOptions.getHttpOptionsWithAuthorization());
    }
}
