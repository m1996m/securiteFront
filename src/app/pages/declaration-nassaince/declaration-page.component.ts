import { Component } from '@angular/core';
import {DeclarationListeComponent} from "./components/declaration-liste/declaration-liste.component";

@Component({
  selector: 'app-declaration-nassaince-page',
  standalone: true,
  imports: [
    DeclarationListeComponent
  ],
  templateUrl: './declaration-page.component.html',
  styleUrl: './declaration-page.component.css'
})
export class DeclarationPageComponent {

}
