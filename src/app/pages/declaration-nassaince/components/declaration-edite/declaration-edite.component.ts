import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzWaveDirective} from "ng-zorro-antd/core/wave";
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";
import {DeclarationService} from "../../../../shared/services/webService/declaration/declaration.service";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {GlobalService} from "../../../../shared/services/webService/globalService/global.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {GlobalSuccessDto} from "../../../../shared/services/webService/globalService/dto/globalSuccess.dto";
import {DeclarationNaissanceEntity} from "../../../../core/entities/declarationNaissance.entity";

@Component({
  selector: 'app-declaration-edite',
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
    NzFormDirective,
    NzStepsComponent,
    NzStepComponent,
    NzFormControlComponent,
    DatePipe
  ],
  templateUrl: './declaration-edite.component.html',
  styleUrl: './declaration-edite.component.css'
})
export class DeclarationEditeComponent {
  formBulder!: FormGroup;
  isVisible: boolean = false;
  pays = Array<{name: string, id: string}>();
  current = 0;
  declaration!: DeclarationNaissanceEntity;
  constructor(
    private fb: NonNullableFormBuilder,
    private declarationService: DeclarationService,
    private authService: AuthService,
    private global: GlobalService,
    private notification: NzNotificationService,
  ) {}

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

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current +=1;
  }

  initForm() {
    this.formBulder = this.fb.group({
      childFirstName: [this.declaration?.childFirstName],
      childLastName: [this.declaration?.childLastName],
      fatherFirstName: [this.declaration?.fatherFirstName, [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      fatherLastName: [this.declaration?.fatherLastName, [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      fatherBirthDate: [this.declaration?.fatherBirthDate, [Validators.required]],
      fatherPhone: [this.declaration?.fatherPhone, [Validators.required, Validators.minLength(3), this.verifificationSaisieEpaceValid]],
      fatherNumberChild: [this.declaration?.fatherNumberChild, [Validators.required, Validators.min(1)]],
      fatherAddress: [this.declaration?.fatherAddress, [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      motherFirstName: [this.declaration?.motherFirstName, [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      motherLastName: [this.declaration?.motherFirstName, [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      motherBirthDate: [this.declaration?.motherBirthDate, [Validators.required]],
      motherPhone: [this.declaration?.motherPhone, [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      motherNumberChild: [this.declaration?.motherNumberChild, [Validators.required, Validators.min(1)]],
      motherAddress: [this.declaration?.motherAddress, [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      birthDateChild: [this.declaration?.birthDateChild, [Validators.required]], // Consider adding date validation if needed
      //hopital: [this.authService.userInfo?.tier, [Validators.required, Validators.minLength(1)]],
      genderChild: [this.declaration?.genderChild, [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      //userId: [this.authService.userInfo?.slug, [Validators.required, this.verifificationSaisieEpaceValid]],
      statut: [this.declaration?.statut, [Validators.required, Validators.minLength(1)]],
      typeNaissance: [this.declaration?.typeNaissance, [Validators.required, Validators.minLength(1)]]
    });
  }


  showModal(declaration: DeclarationNaissanceEntity): void {
    this.declaration = declaration;
    this.initForm();
    this.isVisible = true;
    this.declarationService.notifyModalState(this.isVisible);
  }

  handleOk(): void {
    this.isVisible = false;
    this.declarationService.notifyModalState(this.isVisible);
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
      this.declarationService.upadate(this.formBulder.value, this.declaration?.slug).subscribe((data: GlobalSuccessDto)=>{
        this.handleCancel();
        this.initForm();
        this.createNotification('success','Creation declaration', 'Vous allez recevoir un e-mail pour la confirmation');
      });
    }
  }
}
