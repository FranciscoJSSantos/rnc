import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOptionsService } from '../security/http-options.service';
import { environment } from './../../environments/environment';
import { AlertComponent } from './../components/alert/alert.component';
import { Setor } from './../models/setor.model';

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
		return this._http.get<Setor[]>(environment.url + '/api/Setor');
	}
}
