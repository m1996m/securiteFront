import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzWaveDirective} from "ng-zorro-antd/core/wave";
import {HopitalService} from "../../../../shared/services/webService/hopital/hopital.service";
import {GlobalService} from "../../../../shared/services/webService/globalService/global.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {GlobalSuccessDto} from "../../../../shared/services/webService/globalService/dto/globalSuccess.dto";
import {HopitalEntity} from "../../../../core/entities/hopital.entity";
import {NzFormDirective} from "ng-zorro-antd/form";

@Component({
  selector: 'app-hopital-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzCardComponent,
    NzColDirective,
    NzInputDirective,
    NzModalComponent,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzWaveDirective,
    ReactiveFormsModule,
    NzFormDirective,
    NzModalContentDirective
  ],
  templateUrl: './hopital-edit.component.html',
  styleUrl: './hopital-edit.component.css'
})
export class HopitalEditComponent {
  formBulder!: FormGroup;
  isVisible: boolean = false;
  hopital!: HopitalEntity;
  pays = Array<{name: string, id: string}>();
  constructor(
    private fb: NonNullableFormBuilder,
    private hopitalService: HopitalService,
    private global: GlobalService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.global.getCountries().subscribe((data:any)=>{
      //console.log(data);
      for (const datas of data){
        this.pays.push({name: datas.translations.fra.common, id: datas.idd.root});
      }
      this.pays.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    });
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(
      type,
      title,
      message
    );
  }

  verifificationSaisieEpaceValid(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  initForm() {
    this.formBulder = this.fb.group({
      adresse: [this.hopital?.adresse, [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      email: [this.hopital?.email, [Validators.required, Validators.email, this.verifificationSaisieEpaceValid]],
      tel: [this.hopital?.tel, [Validators.required, Validators.minLength(3), this.verifificationSaisieEpaceValid]],
      designation: [this.hopital?.designation, [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      dateCreation: [this.hopital?.dateCreation.toLocaleString().substring(0,10), [Validators.required, this.verifificationSaisieEpaceValid]],
      pays: [this.hopital?.pays, [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
    });
  }
  showModal(hopital: HopitalEntity): void {
    this.hopital = hopital;
    this.initForm();
    this.isVisible = true;
    this.hopitalService.notifyModalState(this.isVisible);
  }

  handleOk(): void {
    this.isVisible = false;
    this.hopitalService.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  enregistrer(){
    if (this.formBulder.invalid) {
      Object.keys(this.formBulder.controls).forEach(field => {
        const control = this.formBulder.get(field);
        if (control?.invalid) {
          console.error('Champ invalide:', field);
        }
      });
    } else {
      this.hopitalService.upadate(this.formBulder.value, this.hopital?.slug).subscribe((data: GlobalSuccessDto)=>{
        this.handleCancel();
        this.initForm();
        this.createNotification('success','Creation compte', 'Vous allez recevoir un e-mail pour la confirmation');
      });
    }
  }
}
