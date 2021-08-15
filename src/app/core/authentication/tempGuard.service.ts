import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TempGuardService implements CanActivate {

  constructor(private _router: Router, private tokenService: TokenService, private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.tokenService.tokenTemp !== null) {
        return true;
      } else {
        this.auth.logoutTemp();
        this._router.navigate(['/entry/login'], { replaceUrl: false });
        return false;
      }
  }

}
