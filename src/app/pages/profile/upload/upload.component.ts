import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {UserService} from "../../../shared/services/webService/user/user.service";
import {GlobalService} from "../../../shared/services/webService/globalService/global.service";
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-upload',
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
    NzUploadComponent,
    NzIconDirective
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  formBulder!: FormGroup;
  isVisible: boolean = true;
  fileToUpload!: NzUploadFile;

  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }
  ];
  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit():void {
    this.initForm();
  }
  verifificationSaisieEpaceValid(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  initForm() {
    this.formBulder = this.fb.group({
      avatar: ['', [Validators.required, Validators.minLength(4), this.verifificationSaisieEpaceValid]],
      type:['profile']
    });
  }
  showModal(): void {
    this.initForm();
    this.isVisible = true;
    console.log(this.isVisible)
    this.userService.notifyModalState(this.isVisible);
  }

  handleOk(): void {
    this.isVisible = false;
    this.userService.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  handleBeforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {
    this.fileToUpload = file;
    this.formBulder.patchValue({
      avatar: file.name
    });
/*    this.userService.uploadFile(file as unknown as File,'').subscribe(response => {
      console.log(response);
    });*/
    return false;  // toujours retourner false pour empêcher le upload automatique
  };

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(
      type,
      title,
      message
    );
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

      this.createNotification('success','Changement de profile', 'Vous avez changé votre profile');
      this.userService.uploadFile(this.fileToUpload as unknown as File, '').subscribe((data)=>{
        this.createNotification('success','Changement de profile', 'Vous avez changé votre profile');
      });
    }
  }

}
