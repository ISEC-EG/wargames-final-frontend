import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { TeamService } from "../http/team/team.service";

@Injectable({
  providedIn: "root",
})
export class HomeGuardService implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private auth: AuthService,
    private teamService: TeamService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.tokenService.token !== null) {
      return of(true);
    } else {
      return this.teamService.generateCredentials().pipe(
        map((res) => {
          this.auth.logIn;
          localStorage.setItem("userPermission", res["token"]);
          return true;
        }),
        catchError((err) => {
          return of(true);
        })
      );
    }
  }
}
