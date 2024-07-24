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
import {GlobalService} from "../../../../shared/services/webService/globalService/global.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {GlobalSuccessDto} from "../../../../shared/services/webService/globalService/dto/globalSuccess.dto";
import {DeclarationService} from "../../../../shared/services/webService/declaration/declaration.service";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";

@Component({
  selector: 'app-declaration-create',
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
  templateUrl: './declaration-create.component.html',
  styleUrl: './declaration-create.component.css'
})
export class DeclarationCreateComponent {
  formBulder!: FormGroup;
  isVisible: boolean = false;
  pays = Array<{name: string, id: string}>();
  current = 0;
  constructor(
    private fb: NonNullableFormBuilder,
    private declarationService: DeclarationService,
    private authService: AuthService,
    private global: GlobalService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
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

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current +=1;
  }

  initForm() {
    this.formBulder = this.fb.group({
      childFirstName: [''],
      childLastName: [''],
      fatherFirstName: ['', [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      fatherLastName: ['', [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      fatherBirthDate: ['', [Validators.required]],
      fatherPhone: ['', [Validators.required, Validators.minLength(3), this.verifificationSaisieEpaceValid]],
      fatherNumberChild: [1, [Validators.required, Validators.min(1)]],
      fatherAddress: ['', [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      motherFirstName: ['', [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      motherLastName: ['', [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      motherBirthDate: ['', [Validators.required]],
      motherPhone: ['', [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      motherNumberChild: [1, [Validators.required, Validators.min(1)]],
      motherAddress: ['', [Validators.required, Validators.minLength(5), this.verifificationSaisieEpaceValid]],
      birthDateChild: ['', [Validators.required]], // Consider adding date validation if needed
      numeroUnique: [this.global.generateNumeroUnique(), [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      hopital: [this.authService.userInfo?.tier, [Validators.required, Validators.minLength(1)]],
      genderChild: ['', [Validators.required, Validators.minLength(1), this.verifificationSaisieEpaceValid]],
      slug: [this.global.generateUniqueSlug(), [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      userId: [this.authService.userInfo?.slug, [Validators.required, this.verifificationSaisieEpaceValid]],
      statut: ['Vivant', [Validators.required, Validators.minLength(1)]],
      typeNaissance: ['Normal', [Validators.required, Validators.minLength(1)]]
    });
  }


  showModal(): void {
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
      this.declarationService.create(this.formBulder.value).subscribe((data: GlobalSuccessDto)=>{
        this.handleCancel();
        this.initForm();
        this.createNotification('success','Creation declaration', 'Vous allez recevoir un e-mail pour la confirmation');
      });
    }
  }
}
