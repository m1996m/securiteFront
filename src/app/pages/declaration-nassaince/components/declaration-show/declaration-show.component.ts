import {Component, ViewChild} from '@angular/core';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzWaveDirective} from "ng-zorro-antd/core/wave";
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";
import {DeclarationNaissanceEntity} from "../../../../core/entities/declarationNaissance.entity";
import {DeclarationService} from "../../../../shared/services/webService/declaration/declaration.service";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {GlobalService} from "../../../../shared/services/webService/globalService/global.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {DeclarationCreateComponent} from "../declaration-create/declaration-create.component";
import {DeclarationEditeComponent} from "../declaration-edite/declaration-edite.component";
import {
  NzCellFixedDirective,
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzThAddOnComponent, NzTheadComponent, NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {GlobalSuccessDto} from "../../../../shared/services/webService/globalService/dto/globalSuccess.dto";

@Component({
  selector: 'app-declaration-show',
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
    DatePipe,
    DeclarationCreateComponent,
    DeclarationEditeComponent,
    NzCellFixedDirective,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
    NzInputGroupComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThAddOnComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
  ],
  templateUrl: './declaration-show.component.html',
  styleUrl: './declaration-show.component.css'
})
export class DeclarationShowComponent {
  @ViewChild(DeclarationEditeComponent) declarationEditeComponent!: DeclarationEditeComponent;
  isVisible: boolean = false;
  pays = Array<{name: string, id: string}>();
  current = 0;
  declaration!: DeclarationNaissanceEntity;
  generationDeclaration!: DeclarationNaissanceEntity;

  constructor(
    private fb: NonNullableFormBuilder,
    private declarationService: DeclarationService,
    private authService: AuthService,
    private global: GlobalService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit() {}

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(
      type,
      title,
      message
    );
  }

  padString(input: string): string {
    let result = input + '  ';
    let numOfDashesNeeded = 125 - result.length;
    for (let i = 0; i < numOfDashesNeeded; i++) {
      result += '-';
    }
    return result;
  }

  generation(){
    let enfant = this.declaration?.birthDateChild.substring(8,10)+'/'+this.declaration?.birthDateChild.substring(5,7)+'/'+this.declaration?.birthDateChild.substring(0,4);
    let pere = this.declaration?.fatherBirthDate.substring(8,10)+'/'+this.declaration?.fatherBirthDate.substring(5,7)+'/'+this.declaration?.fatherBirthDate.substring(0,4);
    let mere = this.declaration?.motherBirthDate.substring(8,10)+'/'+this.declaration?.motherBirthDate.substring(5,7)+'/'+this.declaration?.motherBirthDate.substring(0,4);
    let generationDeclaration = {
      user: this.authService.userInfo.lastName+' '+this.authService.userInfo.firstName,
      numeroUnique: this.declaration.numeroUnique,
      childFirstName: this.padString('Prénom: '+this.declaration?.childFirstName),
      childLastName: this.padString('Nom : '+this.declaration?.childLastName),
      birthDateChild: this.padString('Date de naissance : '+enfant),
      fatherLastName: this.padString('Nom : '+this.declaration?.fatherLastName),
      fatherFirstName: this.padString('Prénom: '+this.declaration?.fatherFirstName),
      fatherAddress: this.padString('Adresse : '+this.declaration?.fatherAddress),
      fatherPhone: this.padString('Téléphone : '+this.declaration?.fatherPhone),
      fatherBirthDate: this.padString('Date de naissance : '+pere),
      motherPhone: this.padString('Téléphone : '+this.declaration?.motherPhone),
      motherAddress: this.padString('Adresse : '+this.declaration?.motherAddress),
      motherFirstName: this.padString('Prénom: '+this.declaration?.motherFirstName),
      motherLastName: this.padString('Nom : '+this.declaration?.motherLastName),
      motherBirthDate: this.padString('Date de naissance : '+mere),
    }
    this.declarationService.declarationPdf(generationDeclaration).subscribe((data: any)=>{
      console.log(data);
    })
    console.log(generationDeclaration);
  }

  showModal(declaration: DeclarationNaissanceEntity): void {
    this.declaration = declaration;
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
  openEditeDeclaration(declaration: DeclarationNaissanceEntity): void {
    this.declarationEditeComponent.showModal(declaration);
  }
}
