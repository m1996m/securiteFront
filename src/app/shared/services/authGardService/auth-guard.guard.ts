import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, ViewChild } from "@angular/core";
import { LoginComponent } from "../../../pages/auth/components/login/login.component";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root' // Ensure the service is provided in the root module
})
export class AuthGuard implements CanActivate {
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  userInf: any;
  constructor(private authService: AuthService, private router: Router,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isConnect();
  }

  isConnect(): boolean | UrlTree {
    let isValidityToken = this.authService.isAuthenticated(localStorage.getItem('token'));
    if (isValidityToken) {
      this.getUser();
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }

  getUser() {
    this.authService.getUser().subscribe((data) => {
      this.authService.userInfo = data;
    })
  }
}
