import { Injectable } from '@angular/core';
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {Subject} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {GlobalSuccessDto} from "../globalService/dto/globalSuccess.dto";
import {HopitalResponseDto} from "./dto/hopital.response.dto";

@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  public isVisible = false;
  private modalStateSource = new Subject<boolean>();
  modalState$ = this.modalStateSource.asObservable();
  endpoint = 'hopital';

  constructor(private helper: HttpHelper) { }

  notifyModalState(isVisible: boolean): void {
    this.modalStateSource.next(isVisible);
  }

  create(data: FormBuilder) {
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/create`, data);
  }

  upadate(data: FormBuilder, slug: string) {
    return this.helper.request<GlobalSuccessDto>('PATCH', `${this.endpoint}/${slug}`, data);
  }

  getAll(pays: string){
    return this.helper.request<HopitalResponseDto>('GET', `${this.endpoint}/liste`, null, {pays: pays});
  }

  delete(slug: string){
    return this.helper.request<GlobalSuccessDto>('DELETE', `${this.endpoint}/${slug}`);
  }
}
