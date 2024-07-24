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
import {NzFormDirective} from "ng-zorro-antd/form";

@Component({
  selector: 'app-hopital-create',
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
    NzModalContentDirective,
    NzFormDirective
  ],
  templateUrl: './hopital-create.component.html',
  styleUrl: './hopital-create.component.css'
})
export class HopitalCreateComponent {
  formBulder!: FormGroup;
  isVisible: boolean = false;
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
      numeroUnique: [this.global.generateNumeroUnique(), [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      adresse: ['', [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      email: ['', [Validators.required, Validators.email, this.verifificationSaisieEpaceValid]],
      slug: [this.global.generateUniqueSlug(), [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      tel: ['', [Validators.required, Validators.minLength(3), this.verifificationSaisieEpaceValid]],
      designation: ['', [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      dateCreation: ['', [Validators.required, this.verifificationSaisieEpaceValid]],
      pays: ['', [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
    });
  }

  showModal(): void {
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
      this.hopitalService.create(this.formBulder.value).subscribe((data: GlobalSuccessDto)=>{
        this.handleCancel();
        this.initForm();
        this.createNotification('success','Creation compte', 'Vous allez recevoir un e-mail pour la confirmation');
      });
    }
  }
}
