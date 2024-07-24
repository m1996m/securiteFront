import {Component, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {FormsModule} from "@angular/forms";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {
  DeclarationNaissanceResponseDto
} from "../../../../shared/services/webService/declaration/dto/declarationNaissance.response.dto";
import {DeclarationNaissanceEntity} from "../../../../core/entities/declarationNaissance.entity";
import {
  DeclarationCreateComponent
} from "../declaration-create/declaration-create.component";
import {DeclarationEditeComponent} from "../declaration-edite/declaration-edite.component";
import {DeclarationService} from "../../../../shared/services/webService/declaration/declaration.service";
import {HopitalCreateComponent} from "../../../hopital/components/hopital-create/hopital-create.component";
import {HopitalEditComponent} from "../../../hopital/components/hopital-edit/hopital-edit.component";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {DeclarationShowComponent} from "../declaration-show/declaration-show.component";

interface Column {
  key: string;
  title: string;
  compare: ((a: any, b: any) => number) | null;
  priority: boolean;
  alignLeft: boolean;
  input: any;
  alignRight: boolean;
  show: boolean;
  nz: string | null;
}

@Component({
  selector: 'app-declaration-liste',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzModalModule,
    NzSelectModule,
    NzNotificationModule,
    NzTableModule,
    NzIconModule,
    NzDropdownMenuComponent,
    FormsModule,
    NzCardComponent,
    NzRowDirective,
    NzColDirective,
    HopitalCreateComponent,
    HopitalEditComponent,
    NzDropDownDirective,
    NzMenuModule,
    DeclarationCreateComponent,
    DeclarationEditeComponent,
    DeclarationShowComponent
  ],
  templateUrl: './declaration-liste.component.html',
  styleUrl: './declaration-liste.component.css'
})
export class DeclarationListeComponent {
  declarations: DeclarationNaissanceResponseDto = [];
  @ViewChild(DeclarationCreateComponent) declarationCreateComponent!: DeclarationCreateComponent;
  @ViewChild(DeclarationEditeComponent) declarationEditeComponent!: DeclarationEditeComponent;
  @ViewChild(DeclarationShowComponent) declarationShowComponent!: DeclarationShowComponent;
  searchValue = '';
  visible = false;

  listOfDisplayData: DeclarationNaissanceResponseDto = [];
  listOfColumns = [
    {
      key: 'childFirstName', // Nouvelle clé
      title: "Prénom",
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.childFirstName.localeCompare(b.childFirstName),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
      show: true,
      nz: 'nzLeft'
    },
    {
      key: 'childLastName', // Nouvelle clé
      title: "Nom",
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.childLastName.localeCompare(b.childLastName),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
      show: true,
      nz: 'nzLeft'
    },
    {
      key: 'birthDateChild', // Nouvelle clé
      title: 'Date de naissance',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => new Date(a.birthDateChild).getTime() - new Date(b.birthDateChild).getTime(),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
      show: true,
      nz: 'nzLeft'
    },
    {
      key: 'numeroUnique', // Nouvelle clé
      title: 'Numéro Unique',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.numeroUnique.localeCompare(b.numeroUnique),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
      show: true,
      nz: 'nzLeft'
    },
    {
      key: 'genderChild', // Nouvelle clé
      title: "Genre",
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.genderChild.localeCompare(b.genderChild),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: true,
      nz: 'nzLeft'
    },
    {
      key: 'createdAt', // Nouvelle clé
      title: 'Date de création',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.createdAt.getTime() - b.createdAt.getTime(),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: true,
      nz: 'nzLeft'
    },
    {
      key: 'statut', // Nouvelle clé
      title: 'Statut',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.statut.localeCompare(b.statut),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: true,
    },
    {
      key: 'typeNaissance', // Nouvelle clé
      title: 'Type de naissance',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.typeNaissance.localeCompare(b.typeNaissance),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: true,
    },
    {
      key: 'fatherFirstName', // Nouvelle clé
      title: 'Prénom père',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.fatherFirstName.localeCompare(b.fatherFirstName),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
    },
    {
      key: 'fatherLastName', // Nouvelle clé
      title: 'Nom père',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.fatherLastName.localeCompare(b.fatherLastName),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'fatherBirthDate', // Nouvelle clé
      title: 'Date de naissance père',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => new Date(a.fatherBirthDate).getTime() - new Date(b.fatherBirthDate).getTime(),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'fatherPhone', // Nouvelle clé
      title: 'Téléphone père',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.fatherPhone.localeCompare(b.fatherPhone),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'fatherAddress', // Nouvelle clé
      title: 'Adresse du père',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.fatherAddress.localeCompare(b.fatherAddress),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'motherFirstName', // Nouvelle clé
      title: 'Prénom mère',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.motherFirstName.localeCompare(b.motherFirstName),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'motherLastName', // Nouvelle clé
      title: 'Nom mère',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.motherLastName.localeCompare(b.motherLastName),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'motherBirthDate', // Nouvelle clé
      title: 'Date de naissance mère',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => new Date(a.motherBirthDate).getTime() - new Date(b.motherBirthDate).getTime(),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'motherPhone', // Nouvelle clé
      title: 'Téléphone mère',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.motherPhone.localeCompare(b.motherPhone),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'motherAddress', // Nouvelle clé
      title: 'Adresse mère',
      compare: (a: DeclarationNaissanceEntity, b: DeclarationNaissanceEntity) => a.motherAddress.localeCompare(b.motherAddress),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
      show: false,
      nz: null
    },
    {
      key: 'action', // Nouvelle clé
      title: 'Action',
      compare: null,
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: true,
      show: true,
      nz: 'nzRight'
    }
  ];

  constructor(
    private declarationService: DeclarationService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private authService: AuthService,
  ) {}

  isColumnVisible(key: string): boolean {
    const column = this.listOfColumns.find(col => col.key === key);
    return column ? !column.show : false;
  }

  ngOnInit(): void{
    this.executeGetUser();
    setTimeout(()=>{
      console.log(this.authService.userInfo);
    },3000);

    this.getAll();
  }

  onCheckedChange(index: number) {
    this.listOfColumns[index].show = !this.listOfColumns[index].show;
  }

  executeGetUser(){
    this.declarationService.modalState$.subscribe((isVisible: boolean) => {
      this.getAll();
    });
  }

  loadUsers(){
    this.listOfDisplayData.splice(0, this.listOfDisplayData.length);
    for (const user of this.declarations){
      this.listOfDisplayData.push(user);
    }
  }

  reset(): void {
    this.searchValue = '';
    this.loadUsers();
    this.search('');
  }

  search(event: any): void {
    this.searchValue = event;
    this.visible = false;
    this.listOfDisplayData = this.declarations.filter((item: DeclarationNaissanceEntity) =>
      (item.childLastName ? item.childLastName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.childFirstName ? item.childFirstName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.fatherFirstName ? item.fatherFirstName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.fatherLastName ? item.fatherLastName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.fatherBirthDate ? item.fatherBirthDate.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.fatherPhone ? item.fatherPhone.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.fatherAddress ? item.fatherAddress.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.motherFirstName ? item.motherFirstName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.motherLastName ? item.motherLastName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.motherBirthDate ? item.motherBirthDate.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.motherPhone ? item.motherPhone.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.motherAddress ? item.motherAddress.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.birthDateChild ? item.birthDateChild.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.numeroUnique ? item.numeroUnique.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.genderChild ? item.genderChild.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.createdAt ? item.createdAt.toISOString().toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.statut ? item.statut.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.typeNaissance ? item.typeNaissance.toLowerCase().includes(this.searchValue?.toLowerCase()) : false)
    );
  }

  getAll(){
    this.declarationService.getAll(this.authService.userInfo?.tier).subscribe((declarations: DeclarationNaissanceResponseDto) => {
      this.declarations = declarations;
      //this.getUsers();
      this.loadUsers();
      console.log(this.listOfDisplayData)
    });
  }

  delete(slug: string){
    this.declarationService.delete(slug).subscribe(() => {
      this.notification.success('Success', 'Utilisateur supprimer avec succèss');
      this.getAll();
    });
  }
  openCreateDeclaration(){
    this.declarationCreateComponent.showModal();
  }
  openEditDeclaration(declaration: DeclarationNaissanceEntity){
    this.declarationEditeComponent.showModal(declaration);
  }

  openShowDeclaration(declaration: DeclarationNaissanceEntity){
    this.declarationShowComponent.showModal(declaration);
  }

  showDeleteConfirm(slug: string): void {
    this.modal.confirm({
      nzTitle: 'Est tu sûr de vouloir supprimé ?',
      nzContent: '<b style="color: red;">Une fois supprimé vous pouvez plus avoir accées</b>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(slug),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Annuler')
    });
  }
}
