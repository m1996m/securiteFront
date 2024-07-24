import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormBuilder} from "@angular/forms";
import {GlobalSuccessDto} from "../globalService/dto/globalSuccess.dto";
import {DeclarationNaissanceResponseDto} from "./dto/declarationNaissance.response.dto";

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {
  public isVisible = false;
  private modalStateSource = new Subject<boolean>();
  modalState$ = this.modalStateSource.asObservable();
  endpoint = 'declaration-naissance';
  endpoint1 = 'pdf';

  constructor(private helper: HttpHelper) { }

  notifyModalState(isVisible: boolean): void {
    this.modalStateSource.next(isVisible);
  }

  create(data: FormBuilder) {
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint}/create`, data);
  }

  declarationPdf(data: any) {
    return this.helper.request<GlobalSuccessDto>('POST', `${this.endpoint1}/generate`, data);
  }

  upadate(data: FormBuilder, slug: string) {
    return this.helper.request<GlobalSuccessDto>('PATCH', `${this.endpoint}/${slug}`, data);
  }

  getAll(content: string){
    console.log(content)
    return this.helper.request<DeclarationNaissanceResponseDto>('GET', `${this.endpoint}/liste`, null, {content: content});
  }

  recherche(content: string){
    return this.helper.request<DeclarationNaissanceResponseDto>('GET', `${this.endpoint}/recherche`, null, {content: content});
  }

  delete(slug: string){
    return this.helper.request<GlobalSuccessDto>('DELETE', `${this.endpoint}/${slug}`);
  }
}
