import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authtoken: any;
  user: any;
  constructor(private _Http: Http) { }
  registerUser(user) {
   const headers = new Headers();
   headers.append('Content-type', 'application/json');
   return this._Http.post('http://localhost:3000/users/register', user, {headers: headers})
   .map(res => res.json());
  }
  authenticateUser(user) {
   const headers = new Headers();
   headers.append('Content-type', 'application/json');
   return this._Http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
   .map(res => res.json());
  }
  storeUserData(token, user) {
   localStorage.setItem('id_token', token);
   localStorage.setItem('user', JSON.stringify(user));
   this.authtoken = token;
   this.user = user;
  }
  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this._Http.get('http://localhost:3000/users/profile', {headers: headers})
    .map(res => res.json());
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authtoken = token;
  }
  logout() {
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
}
