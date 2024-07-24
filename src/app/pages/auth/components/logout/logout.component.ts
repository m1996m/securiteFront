import { Component } from '@angular/core';
import {NonNullableFormBuilder} from "@angular/forms";
import {AuthService} from "../../../../shared/services/authGardService/auth.service";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(
    private authService: AuthService
  ) {}

  updatePassword(){
    this.authService.logout().subscribe((data)=>{})
  }

}
