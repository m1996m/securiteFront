import { Injectable } from '@angular/core';
import {HttpHelper} from "../../../core/helpers/http.helper";
import {FormBuilder} from "@angular/forms";
import {GlobalSuccessDto} from "../webService/globalService/dto/globalSuccess.dto";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userInfo: any;
  endpoint = 'auth';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    })
  };
  constructor(private helper: HttpHelper, private http: HttpClient) { }


   getUser(){
    return this.http.get('http://127.0.0.1:3000/user/liste/token', this.httpOptions);
  }

  login(data: FormBuilder) {
      return this.helper.request<any>('POST', `${this.endpoint}/login`, data);
  }
  updatePassword(data: FormBuilder){
    return this.helper.request<GlobalSuccessDto>('PATCH', `${this.endpoint}/update/passwodd`, data);
  }
  sendEmail(data: FormBuilder){
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/send/email/reset`, data);
  }
  forgetPassword(data: FormBuilder){
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/forget/password`, data);
  }
  logout(){
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/logout`);
  }
  isAuthenticated(token: any){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    if(expiry * 1000 > Date.now()){
      return true;
    }else{
      return false;
    }
  }
}
