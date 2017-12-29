import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
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
}
