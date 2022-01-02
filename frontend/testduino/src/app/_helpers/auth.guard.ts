import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../infraestructure/login/login.service';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private user_void = new User();
  constructor(private router: Router, private loginService: LoginService) {

   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.loginService.userValue;
    let user_have_token = user.token !== '' && user.token !== undefined;

    if (user_have_token) {
      // authorised so return true
      //navegar a usuarios
      
      return true;
    }
    this.router.navigate(['login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

}
