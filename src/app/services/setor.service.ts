import { Setor } from './../models/setor.model';
import { environment } from './../../environments/environment';
import { AlertComponent } from './../components/alert/alert.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptionsService } from '../security/http-options.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(
    private _http: HttpClient,
    private _httpOptions: HttpOptionsService,
		private _alert: AlertComponent) {
  }
  
  getAllSetor(): Observable<any> { 
		return this._http.get<Setor[]>(environment.url + '/api/Setor', this._httpOptions.getHttpOptionsWithAuthorization());
	}
}
