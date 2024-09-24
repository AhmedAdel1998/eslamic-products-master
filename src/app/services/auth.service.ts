import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../config/apis';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login( user:any){
   return this.http.post(login,user);
  }
  
}
