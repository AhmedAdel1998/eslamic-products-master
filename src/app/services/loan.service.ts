import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getProducts } from '../config/apis';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http:HttpClient) { }

  getProducts(){
   return this.http.post(getProducts,"");
  }
}
