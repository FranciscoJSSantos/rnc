import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor() { }

  getHttpOptionsWithAuthorization(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
     
        'Access-Control-Allow-Origin': '*',
      })
    };
  }

  getHttpOptionsWithAuthorizationWithText(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        'Access-Control-Allow-Origin': '*',
      }),
      responseType: 'text'
    };
  }

  getHttpOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  getHttpOptionsToLogin(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
		    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      }),
      responseType: 'json'
    };
  }
}
