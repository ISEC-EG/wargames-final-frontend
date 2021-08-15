import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { take, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { TeamService } from "../http/team/team.service";
import { TeamProfileInfo } from "../interfaces/team/teamProfileInfo";
import { TokenService } from "../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class TeamResolveService implements Resolve<Observable<TeamProfileInfo> | TeamProfileInfo> {
  constructor(
    private teamService: TeamService,
    private tokenService: TokenService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenService.token) {
      return this.teamService.myProfileInfo().pipe(
        take(1),
        map((teamInfo) => teamInfo),
      );
    } else return null;
  }
}
