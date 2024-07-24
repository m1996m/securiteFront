import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {GlobalService} from "../../shared/services/webService/globalService/global.service";
import {GlobalSuccessDto} from "../../shared/services/webService/globalService/dto/globalSuccess.dto";
import {HopitalService} from "../../shared/services/webService/hopital/hopital.service";
import {HopitalListeComponent} from "./components/hopital-liste/hopital-liste.component";

@Component({
  selector: 'app-hopital-page',
  standalone: true,
  imports: [
    HopitalListeComponent
  ],
  templateUrl: './hopital-page.component.html',
  styleUrl: './hopital-page.component.css'
})
export class HopitalPageComponent {}
