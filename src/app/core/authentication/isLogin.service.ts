import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { TokenService } from "./token.service";
@Injectable({
  providedIn: "root",
})
export class IsLoginService implements CanActivate {
  constructor(
    private _router: Router,
    private tokenService: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.tokenService.token !== null) {
      this._router.navigate(['/'], { replaceUrl: false });
    } else {
      return true;
    }
  }
}
