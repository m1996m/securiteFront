import {Component, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {UserCreateComponent} from "../user-create/user-create.component";
import {UserEditeComponent} from "../user-edite/user-edite.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {UserResponseDto} from "../../../shared/services/webService/user/dto/user.response.dto";
import {UserEntity} from "../../../core/entities/user.entity";
import {UserService} from "../../../shared/services/webService/user/user.service";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../shared/services/authGardService/auth.service";

@Component({
  selector: 'app-user-liste',
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
    NzIconModule,
  ],
  templateUrl: './user-liste.component.html',
  styleUrl: './user-liste.component.css'
})
export class UserListeComponent {
  users: UserResponseDto = [];
  @ViewChild(UserCreateComponent) createUserComponent!: UserCreateComponent;
  @ViewChild(UserEditeComponent) editUserComponent!: UserEditeComponent;
  searchValue = '';
  visible = false;
  listOfDisplayData = [...this.users];
  listOfColumns = [
    {
      title: 'Prénom',
      compare: (a: UserEntity, b: UserEntity) => a.firstName.localeCompare(b.firstName),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
    },
    {
      title: 'Nom',
      compare: (a: UserEntity, b: UserEntity) => a.lastName.localeCompare(b.lastName),
      priority: false,
      alignLeft: true,
      input: null,
      alignRight: false,
    },
    {
      title: 'Type',
      compare: (a: UserEntity, b: UserEntity) => a.type_user.localeCompare(b.type_user),
      priority: false,
      alignLeft: true,
      input: 'type',
      alignRight: false,
    },
    {
      title: 'Statut',
      compare: (a: UserEntity, b: UserEntity) => a.statut.localeCompare(b.statut),
      priority: false,
      alignLeft: false,
      input: "statut",
      alignRight: false,
    },
    {
      title: 'Pays',
      compare: (a: UserEntity, b: UserEntity) => a.pays.localeCompare(b.pays),
      priority: false,
      alignLeft: false,
      input: null,
      alignRight: false,
    },
    {
      title: 'Email',
      compare: (a: UserEntity, b: UserEntity) => a.username.localeCompare(b.username),
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
    private userService: UserService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void{
    this.executeGetUser();
    this.getUser();
  }
  executeGetUser(){
    this.userService.modalState$.subscribe((isVisible: boolean) => {
      this.getUser();
    });
  }

  loadUsers(){
    this.listOfDisplayData.splice(0, this.listOfDisplayData.length);
    for (const user of this.users){
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
    this.listOfDisplayData = this.users.filter((item) =>
      (item.firstName ? item.firstName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.lastName ? item.lastName.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.type_user ? item.type_user.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.pays ? item.pays.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.username ? item.username.toLowerCase().includes(this.searchValue?.toLowerCase()) : false) ||
      (item.statut ? item.statut.toLowerCase().includes(this.searchValue?.toLowerCase()) : false)
      //(item.birthDate ? item.birthDate.toISOString().toLowerCase().includes(this.searchValue?.toLowerCase()) : false)
    );
  }

  getUsers(): void {
    this.authService.getUser().subscribe((users: any) => {
      console.log(users);
    });
  }

  getUser(){
    this.userService.getUsers('').subscribe((users: UserResponseDto) => {
      this.users = users;
      this.getUsers();
      this.loadUsers();
      console.log(this.listOfDisplayData)
    });
  }
  delete(slug: string){
    this.userService.delete(slug).subscribe(() => {
      this.notification.success('Success', 'Utilisateur supprimer avec succèss');
      this.getUser();
    });
  }
  openCreateUser(){
    this.createUserComponent.showModal();
  }
  openEditUser(user: UserEntity){
    this.editUserComponent.showModal(user);
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
