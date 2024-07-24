import { Injectable } from '@angular/core';
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormBuilder} from "@angular/forms";
import {Subject} from "rxjs";
import {GlobalSuccessDto} from "../globalService/dto/globalSuccess.dto";
import {UserResponseDto} from "./dto/user.response.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isVisible = false;
  private modalStateSource = new Subject<boolean>();
  modalState$ = this.modalStateSource.asObservable();
  endpoint = 'user';
  constructor(private helper: HttpHelper) { }
  notifyModalState(isVisible: boolean): void {
    this.modalStateSource.next(isVisible);
  }
  create(data: FormBuilder) {
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/create`, data);
  }

  createUserHopital(data: any) {
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/create/user/hopital`, data);
  }

  upadate(data: FormBuilder, slug: string) {
    return this.helper.request<GlobalSuccessDto>('PATCH', `${this.endpoint}/${slug}`, data);
  }

  uploadFile(file: any,slug: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/uploadfile`, formData);
  }

  getUsers(pays: string){
    return this.helper.request<UserResponseDto>('GET', `${this.endpoint}/liste`);
  }

  uniquementEmail(email: string, hopitalSlug: string){
    const data = { email:email, hopitalSlug: hopitalSlug };
    return this.helper.request<UserResponseDto>('GET', `${this.endpoint}/verifie/unique`, null, data);
  }

  getCountriesUser(){
    return this.helper.request<GlobalSuccessDto>('GET', `${this.endpoint}/countries`);
  }

  delete(slug: string){
    return this.helper.request<GlobalSuccessDto>('DELETE', `${this.endpoint}/${slug}`);
  }
}
