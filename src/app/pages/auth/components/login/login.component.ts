import {Component, ViewChild} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {ForgetPasswordComponent} from "../forget-password/forget-password.component";
import {UserCreateComponent} from "../../../user/user-create/user-create.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzCardModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzModalModule,
    ForgetPasswordComponent,
    UserCreateComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild(UserCreateComponent) createUserComponent!: UserCreateComponent;
  @ViewChild(ForgetPasswordComponent) forgetPasswordComponent!: ForgetPasswordComponent
  formBulder!: FormGroup;
  isVisible: boolean = true;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}
  ngOnInit(){
      this.initForm();
  }

  initForm(){
    this.formBulder = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  openForgetPassWord(){
    this.forgetPasswordComponent.showModal();
  }

  openInscription(){
    this.createUserComponent.showModal();
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  login(){
    this.formBulder.removeControl('remember')
    this.authService.login(this.formBulder.value).subscribe((data)=>{
      localStorage.setItem('token', data.access_token);
      this.router.navigate(['/user']);
    })
  }

}
