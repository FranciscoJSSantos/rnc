import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../components/alert/alert.component';
import { User } from '../models/user';
import { UserData } from '../models/user-data.model';
import { UserPassword } from '../models/user-password';
import { environment } from './../../environments/environment';
import { HttpOptionsService } from './../security/http-options.service';
import { SessionService } from './../security/session.service';


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
		return this._http.post<boolean>(environment.url + '/api/User', JSON.stringify(user))
	}
	// VERIFICAR QUESTAO DO ATIVO
	findAllUsers(): Observable<any> {
		return this._http.get<UserData[]>(environment.url + '/api/User/ToApprove');
	}

	approveUser(emailUser: string): Observable<any> {
		return this._http.put<any>(environment.url + '/api/User/ApproveUser/' + emailUser, null);
	}

	reproveUser(emailUser: string): Observable<any> {
		return this._http.delete<any>(environment.url + '/api/User/Disapprove/' + emailUser)
	}

	findUserById(email: string): Observable<any> {
		return this._http.get<User>(`${environment.url+'/api/User/'+email}`);
	}
	
	atualizarSenha(userPassword: UserPassword){
        return this._http.put<boolean>(environment.url + '/api/User/ChancePassword', userPassword);
    }
	atualizarUsuario(user: UserData): Observable<any>{
        return this._http.put<UserData>(environment.url + '/api/User/ChangeName', user);
    }
}

