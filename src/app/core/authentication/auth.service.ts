import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TeamService } from "../http/team/team.service";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData = {};

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private dialog: MatDialog,
    private teamService: TeamService
  ) { }

  public async logout() {
    this.dialog.closeAll();
    this.teamService.logout().subscribe(res => {
    });
    this.tokenService.logout();
    this.router.navigate(["/entry/login"], { replaceUrl: false });
  }

  public logoutTemp() {
    this.tokenService.logoutTemp();
  }

  public async logIn(data) {
    this.tokenService.token = data["token"];
    this.router.navigate(["/"], { replaceUrl: false });
  }

  public logInTemp(data) {
    this.tokenService.tokenTemp = data["temp"];
  }

}
