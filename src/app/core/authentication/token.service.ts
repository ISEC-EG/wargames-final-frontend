import { Injectable } from "@angular/core";
import { ChallengeService } from "../http/challenge/challenge.service";
import { TeamService } from "../http/team/team.service";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(
    private challengeService: ChallengeService,
    private teamService: TeamService
  ) {}

  public get token(): string {
    return localStorage.getItem("userPermission");
  }

  public get tokenTemp(): string {
    return localStorage.getItem("tempPermission");
  }

  public get forgetToken(): string {
    return localStorage.getItem("permission");
  }

  public set token(token: string) {
    localStorage.setItem("userPermission", token);
  }

  public set tokenTemp(token: string) {
    localStorage.setItem("tempPermission", token);
  }

  public logout() {
    this.challengeService.challenges$.next(null);
    this.challengeService.hint$.next(null);
    this.teamService.teamProfileInfo$.next(null);
    this.teamService.dashboardTeams$.next([]);
    this.teamService.teams_page$.next([]);
    this.teamService.count_teams$.next(null);
    this.teamService.teams_page_no$.next([]);

    localStorage.removeItem("userPermission");
  }

  public logoutTemp() {
    localStorage.removeItem("tempPermission");
  }
}
