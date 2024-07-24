import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {UserService} from "../../../shared/services/webService/user/user.service";
import {GlobalService} from "../../../shared/services/webService/globalService/global.service";
import {GlobalSuccessDto} from "../../../shared/services/webService/globalService/dto/globalSuccess.dto";
import {UserEntity} from "../../../core/entities/user.entity";
import {NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-user-edite',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzModalModule,
    NzSelectModule,
    NzNotificationModule,
    FormsModule,
    NzIconModule,
  ],
  templateUrl: './user-edite.component.html',
  styleUrl: './user-edite.component.css'
})
export class UserEditeComponent {
  formBulder!: FormGroup;
  isVisible: boolean = false;
  isParticulier: boolean = false;
  isSamePassword: boolean = false;
  user !: UserEntity;
  pays = Array<{name: string, id: string}>();
  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private global: GlobalService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  SamePassword(){
    this.isSamePassword = false;
    if((this.formBulder.value['confirmation'].length >7 && this.formBulder.value['password'].length >7)){
      if (
        (this.formBulder.value['confirmation'] === this.formBulder.value['password'])
      ) {
        this.isSamePassword = false;
      }else {
        this.isSamePassword = true;
      }
    }
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

  verficaitonTypeUser(){
    this.isParticulier = false;
    if (this.formBulder.value['type'] === 'Particulier'){
      this.isParticulier = true;
    }
  }


  verifificationSaisieEpaceValid(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  initForm() {
    this.formBulder = this.fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(3), this.verifificationSaisieEpaceValid]],
      type_user: [this.user.type_user, [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      pays: [this.user.pays, [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      statut: [this.user?.statut, this.verifificationSaisieEpaceValid],
      birthDate: [this.user?.birthDate, this.verifificationSaisieEpaceValid],
      role: [this.user?.role, [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      //gender: ['', [Validators.pattern('^[HF]$')]],
    });
  }

  showModal(user: UserEntity): void {
    this.user = user;
    this.initForm();
    this.isVisible = true;
    this.userService.notifyModalState(this.isVisible);
  }

  handleOk(): void {
    this.isVisible = false;
    this.userService.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getRoleFromUserType(userType: string): string {
    switch (userType) {
      case 'Hopital':
        return 'USER_SANTE';
      case 'Patient':
        return 'USER_PATIENT';
      case 'Personnel':
        return 'USER_PERSONNEL';
      case 'Admin':
        return 'USER_ADMIN';
      default:
        throw new Error('Invalid user type');
    }
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
      this.formBulder.removeControl('confirmation');
      this.formBulder.patchValue({role: this.getRoleFromUserType(this.formBulder.value['type_user'])});
      this.userService.upadate(this.formBulder.value, this.user?.slug).subscribe((data: GlobalSuccessDto)=>{
        this.handleCancel();
        this.initForm();
        this.createNotification('success','Creation compte', 'Vous allez recevoir un e-mail pour la confirmation');
      });
    }
  }
}
