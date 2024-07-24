
import { Component } from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-send-email-reset',
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
  templateUrl: './send-email-reset.component.html',
  styleUrl: './send-email-reset.component.css'
})
export class SendEmailResetComponent {
  formBulder!: FormGroup;
  isVisible: boolean = true;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private notificationService: NzNotificationService
  ) {}
  ngOnInit(){
    this.initForm();
  }

  verifificationSaisieEpaceValid(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  initForm(){
    this.formBulder = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(8), Validators.email, this.verifificationSaisieEpaceValid]],
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

  sendEmail(){
    this.notificationService.success('Envoie', "Vous avez reçu un e-mail pour créer un nouveau mot passe")
    this.authService.sendEmail(this.formBulder.value).subscribe((data)=>{})
  }
}
