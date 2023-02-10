import { Observable } from 'rxjs';
import { HttpOptionsService } from './../security/http-options.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { SessionService } from './../security/session.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserData } from '../models/user-data.model';
import { AlertComponent } from '../components/alert/alert.component';
import { UserPassword } from '../models/user-password';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private _http: HttpClient,
		private _alert: AlertComponent,
		private _sessionService: SessionService,
		private _httpOptions: HttpOptionsService,
		private _router: Router) {	}

	save(user: User): Observable<any> {
		return this._http.post<boolean>(environment.url + '/api/User', JSON.stringify(user), this._httpOptions.getHttpOptions())
	}
	// VERIFICAR QUESTAO DO ATIVO
	findAllUsers(): Observable<any> {
		return this._http.get<UserData[]>(environment.url + '/api/User/ToApprove', this._httpOptions.getHttpOptionsWithAuthorization());
	}

	approveUser(emailUser: string): Observable<any> {
		return this._http.put<any>(environment.url + '/api/User/ApproveUser/' + emailUser, null, this._httpOptions.getHttpOptionsWithAuthorization());
	}

	reproveUser(emailUser: string): Observable<any> {
		return this._http.delete<any>(environment.url + '/api/User/Disapprove/' + emailUser, this._httpOptions.getHttpOptionsWithAuthorization())
	}

	findUserById(email: string): Observable<any> {
		return this._http.get<User>(`${environment.url+'/api/User/'+email}`, this._httpOptions.getHttpOptionsWithAuthorization());
	}
	
	atualizarSenha(userPassword: UserPassword){
        return this._http.put<boolean>(environment.url + '/api/User/ChancePassword', userPassword, this._httpOptions.getHttpOptionsWithAuthorization());
    }
	atualizarUsuario(user: UserData): Observable<any>{
        return this._http.put<UserData>(environment.url + '/api/User/ChangeName', user, this._httpOptions.getHttpOptionsWithAuthorization());
    }
}

