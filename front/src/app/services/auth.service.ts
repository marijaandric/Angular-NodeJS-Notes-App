import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../enviroments/enviroment';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { UserRegister } from '../models/userRegister.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  
  private backUrl = Enviroment.backUrl + "/auth";

  login(user: User): Observable<Token> {
    return this.httpClient.post<Token>(`${this.backUrl}/login`, user, {responseType: "json"} );
  }

  saveTokenAndIdToStorage(token: string) {
    const _id = jwtDecode(token) as any;
    if (token) {
      localStorage.setItem('token', token);
    }else {
      console.error('Nevažeći token.');
    } 
    if(_id._id){
      localStorage.setItem("id", _id._id);
    } else {
      console.error('Nevažeći id.');
    }
  }

  getToken()
  {
    return localStorage.getItem("token");
  }

  getId()
  {
    return localStorage.getItem("id");
  }

  deleteToken()
  {
    localStorage.removeItem('token');
  }
  
  register(user:UserRegister): Observable<Token>{
    return this.httpClient.post<Token>(`${this.backUrl}/register`, user)
  }

  validate(): Observable<any> {
    let token = localStorage.getItem("token");

    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });

    return this.httpClient.get<any>(`${this.backUrl}/validate-jwt`, { headers: httpHeader });
  }
}
