import { Session } from './../models/session.model';
import { HttpOptionsService } from './http-options.service';
import { environment } from './../../environments/environment';
import { UserLogin } from './../models/user-login';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from '../components/alert/alert.component';
@Injectable({
	providedIn: 'root'
})
export class JwtServiceService {

	constructor(
		private _http: HttpClient,
		private _alert: AlertComponent,
		private _sessionService: SessionService,
		private _httpOptions: HttpOptionsService,
		private _router: Router) {
	}

	login(userLogin: UserLogin) {
		this._http.post<Session>(environment.url + '/api/Auth', JSON.stringify(userLogin), this._httpOptions.getHttpOptionsToLogin())
			.subscribe(response => {
				sessionStorage.setItem('token', response['token']);
				sessionStorage.setItem('permission', response['permission']);
				sessionStorage.setItem('user', JSON.stringify(response['user']));
				sessionStorage.setItem('autenticado', 'true');
				let user = response['user'];
				this._sessionService.set('token', response['token']);
				this._sessionService.set('email', user.email);
				this._sessionService.set('permission', response['permission']);
				this._sessionService.set('completeName', user.completeName);
				this._router.navigateByUrl('/occurrences');
			}, erro => {
				this._alert.show('Erro', erro.error, 'error');
			});
	}

	esqueciSenha(email: string) {
		this._http.put<boolean>(environment.url + '/api/ForgetPassword/' + email, this._httpOptions.getHttpOptionsToLogin())
			.subscribe(response => {
				this._alert.show('Enviado', 'Email enviado com sucesso!', 'success');
				this._router.navigateByUrl('/login');
			}, erro => {
				this._alert.show('Erro', erro.error, 'error');
			});
	}

	logout() {
		sessionStorage.clear();
		this._sessionService.clear();
		this._router.navigateByUrl('login');
		location.reload();
	}

	isAuthenticated(): boolean {
		if (sessionStorage.getItem('autenticado')) {
			return JSON.parse(sessionStorage.getItem('autenticado')) && (sessionStorage.getItem('token') !== null);
		}
		return false;
	}
}

