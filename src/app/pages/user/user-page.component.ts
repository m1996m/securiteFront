import { Component } from '@angular/core';
import {UserListeComponent} from "./user-liste/user-liste.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    UserListeComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

}
