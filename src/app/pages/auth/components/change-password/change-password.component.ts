import { Component } from '@angular/core';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    NzCardModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzModalModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  formBulder!: FormGroup;
  isVisible: boolean = false;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}
  ngOnInit(){
    this.initForm();
  }
  mustMatch(){
    return (formGroup: FormGroup) => {
      if (this.formBulder.value['confirmation'] === this.formBulder.value['password']) {
        return true;
      }else {
        return false;
      }
    }
  }

  verifificationSaisieEpaceValid(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  verificaitonMotPasse(){

  }
  initForm(){
    this.formBulder = this.fb.group({
      ancien: ['', [Validators.required, Validators.minLength(8), this.verifificationSaisieEpaceValid]],
      password: ['', [Validators.required, Validators.minLength(8), this.verifificationSaisieEpaceValid]],
      confirmation: ['', [Validators.required, Validators.minLength(8), this.verifificationSaisieEpaceValid]]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  updatePassword(){
    this.notification.create('success', 'Changement de mot passe', 'Votre mot de passe a été modifié avec succèss');
    this.authService.updatePassword(this.formBulder.value).subscribe((data)=>{})
  }

}
