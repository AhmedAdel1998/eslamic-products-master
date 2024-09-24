import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getTamweelPersonaInfo } from '../config/apis';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http:HttpClient) { }

  getUserData(id:any){
   return this.http.post(getTamweelPersonaInfo,id);
  }
}
