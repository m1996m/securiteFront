import { Routes } from '@angular/router';
import {UserPageComponent} from "./pages/user/user-page.component";
import {LoginComponent} from "./pages/auth/components/login/login.component";
import {AuthGuard} from "./shared/services/authGardService/auth-guard.guard";
import {HopitalPageComponent} from "./pages/hopital/hopital-page.component";
import {DeclarationPageComponent} from "./pages/declaration-nassaince/declaration-page.component";

export const routes: Routes = [
  {
    path: 'user',
    component: UserPageComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'administration/hopital',
    component: HopitalPageComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'declaration',
    component: DeclarationPageComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},

];
