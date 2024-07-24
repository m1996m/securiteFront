import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {CommonModule, DatePipe} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {GlobalSuccessDto} from "../../../shared/services/webService/globalService/dto/globalSuccess.dto";
import {UserService} from "../../../shared/services/webService/user/user.service";
import {GlobalService} from "../../../shared/services/webService/globalService/global.service";
import {NzIconModule} from "ng-zorro-antd/icon";
import {HopitalService} from "../../../shared/services/webService/hopital/hopital.service";
import {HopitalResponseDto} from "../../../shared/services/webService/hopital/dto/hopital.response.dto";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {UserResponseDto} from "../../../shared/services/webService/user/dto/user.response.dto";

@Component({
  selector: 'app-user-create',
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
    NzFormControlComponent,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  formBulder!: FormGroup;
  isVisible: boolean = false;
  isSamePassword: boolean = false;
  hopitals: HopitalResponseDto = [];
  isEmail = false;
  pays = Array<{name: string, id: string}>();
  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private hopitalService: HopitalService,
    private global: GlobalService,
    private notification: NzNotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.executeFuction();
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

  executeFuction(){
    this.getAllHopital('');
  }

  getAllHopital(event: any){
    this.hopitalService.getAll(this.formBulder?.value['pays']).subscribe((hopitaux: HopitalResponseDto) => {
      this.hopitals = hopitaux;
    });
  }

  verificationEmail(event: any){
    this.isEmail = false;
    this.userService.uniquementEmail(this.formBulder?.value['username'], this.formBulder?.value['tier']).subscribe((users: UserResponseDto) => {
      console.log(users);
      if (users.length > 0 && users[0]?.userHopital[0].hopitalId == this.formBulder?.value['tier'] )
        this.isEmail = true;
    });
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
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let dayString = day < 10 ? `0${day}` : `${day}`;
    let monthString = month < 10 ? `0${month}` : `${month}`;

    let formattedDate = `${dayString}-${monthString}-${year}`;
    this.formBulder = this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      firstName: ['', [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      lastName: ['', [Validators.required, Validators.minLength(3), this.verifificationSaisieEpaceValid]],
      type_user: ['', [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      pays: ['', [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      password: ['', [Validators.required, Validators.minLength(8), this.verifificationSaisieEpaceValid,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,}')]],
      confirmation: ['', [Validators.required, Validators.minLength(8), this.verifificationSaisieEpaceValid,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,}')]],
      statut: ['Actif', this.verifificationSaisieEpaceValid],
      birthDate: [''],
      debut: [formattedDate, [Validators.required, this.verifificationSaisieEpaceValid]],
      tier: ['', [Validators.required, this.verifificationSaisieEpaceValid]],
      role: ['USER_ROLE', [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      //gender: ['', [Validators.pattern('^[HF]$')]],
      slug: [this.global.generateUniqueSlug(), [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
    });
  }

  showModal(): void {
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

  createUserHopital(data: any){
    this.userService.createUserHopital(data).subscribe((data: GlobalSuccessDto)=>{});
  }

  createFunction(data: any){
    this.createUserHopital(data);
  }

  data(){
    const data = {
      hopitalId: this.formBulder.value['tier'],
      userId: this.formBulder.value['slug'],
      debut: this.formBulder.value['debut'],
      fin: null,
    }
    console.log(data)
    return data;
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
      const datas = this.data();
      this.formBulder.removeControl('debut');
      this.formBulder.removeControl('confirmation');
      this.formBulder.patchValue({role: this.getRoleFromUserType(this.formBulder.value['type_user'])});
      this.userService.create(this.formBulder.value).subscribe((data: GlobalSuccessDto)=>{
        this.createFunction(datas);
        this.handleCancel();
        this.initForm();
        this.createNotification('success','Creation compte', 'Vous allez recevoir un e-mail pour la confirmation');
      });
    }
  }
}
