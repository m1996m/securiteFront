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
import {NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {FormsModule} from "@angular/forms";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";
import {HopitalService} from "../../../../shared/services/webService/hopital/hopital.service";
import {HopitalEntity} from "../../../../core/entities/hopital.entity";
import {HopitalResponseDto} from "../../../../shared/services/webService/hopital/dto/hopital.response.dto";
import {HopitalCreateComponent} from "../hopital-create/hopital-create.component";
import {HopitalEditComponent} from "../hopital-edit/hopital-edit.component";
import {UserCreateComponent} from "../../../user/user-create/user-create.component";
import {UserEditeComponent} from "../../../user/user-edite/user-edite.component";

@Component({
  selector: 'app-hopital-liste',
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
    UserCreateComponent,
    UserEditeComponent,
    HopitalCreateComponent,
    HopitalEditComponent,
  ],
  templateUrl: './hopital-liste.component.html',
  styleUrl: './hopital-liste.component.css'
})
export class HopitalListeComponent {
  hopitaux: HopitalResponseDto = [];
  @ViewChild(HopitalCreateComponent) hopitalCreateComponent!: HopitalCreateComponent;
  @ViewChild(HopitalEditComponent) hopitalEditComponent!: HopitalEditComponent;
  searchValue = '';
  visible = false;
  listOfDisplayData: HopitalResponseDto = [];
  listOfColumns = [
    {
      title: 'Désignation',
      compare: (a: HopitalEntity, b: HopitalEntity) => a.designation.localeCompare(b.designation),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
    },
    {
      title: 'Date de création',
      compare: (a: HopitalEntity, b: HopitalEntity) => a.dateCreation.getTime() - b.dateCreation.getTime(),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
    },
    {
      title: 'Adresse',
      compare: (a: HopitalEntity, b: HopitalEntity) => a.adresse.localeCompare(b.adresse),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
    },
    {
      title: 'Téléphone',
      compare: (a: HopitalEntity, b: HopitalEntity) => a.tel.localeCompare(b.tel),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
    },
    {
      title: 'Email',
      compare: (a: HopitalEntity, b: HopitalEntity) => a.email.localeCompare(b.email),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
    },
    {
      title: 'Numéro Unique',
      compare: (a: HopitalEntity, b: HopitalEntity) => a.numeroUnique.localeCompare(b.numeroUnique),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
    },
    {
      title: 'Pays',
      compare: (a: HopitalEntity, b: HopitalEntity) => a.pays.localeCompare(b.pays),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
    },
    {
      title: 'Action',
      compare: null,
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: true,
    }
  ];
  constructor(
    private hopitalService: HopitalService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void{
    this.executeGetUser();
    this.getAll();
  }
  executeGetUser(){
    this.hopitalService.modalState$.subscribe((isVisible: boolean) => {
      this.getAll();
    });
  }

  loadUsers(){
    this.listOfDisplayData.splice(0, this.listOfDisplayData.length);
    for (const user of this.hopitaux){
      this.listOfDisplayData.push(user);
    }
  }

  reset(): void {
    this.searchValue = '';
    this.loadUsers();
    this.search('');
  }

  search(event: any): void {
    //const inputId = event.target?.id;
    this.searchValue = event;
    this.visible = false;
    this.listOfDisplayData = this.hopitaux.filter((item) =>
        (item.designation ? item.designation.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
        (item.dateCreation ? item.dateCreation.toISOString().toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
        (item.tel ? item.tel.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
        (item.pays ? item.pays.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
        (item.email ? item.email.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
        (item.numeroUnique ? item.numeroUnique.toLowerCase().includes(this.searchValue?.toLowerCase()) : false)
    );
  }

  getUsers(): void {
    this.authService.getUser().subscribe((users: any) => {
      console.log(users);
    });
  }

  getAll(){
    this.hopitalService.getAll('Guinée').subscribe((hopitaux: HopitalResponseDto) => {
      this.hopitaux = hopitaux;
      this.getUsers();
      this.loadUsers();
      console.log(this.listOfDisplayData)
    });
  }
  delete(slug: string){
    this.hopitalService.delete(slug).subscribe(() => {
      this.notification.success('Success', 'Utilisateur supprimer avec succèss');
      this.getAll();
    });
  }
  openCreatehopital(){
    this.hopitalCreateComponent.showModal();
  }
  openEdithopital(user: HopitalEntity){
    this.hopitalEditComponent.showModal(user);
  }
  showDeleteConfirm(slug: string): void {
    this.modal.confirm({
      nzTitle: 'Est tu sûr de vouloir supprimé?',
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
