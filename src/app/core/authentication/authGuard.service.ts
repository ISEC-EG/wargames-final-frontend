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
import { MatDialog } from "@angular/material";
import { MessageComponent } from "src/app/components/entry-components/message/message.component";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private auth: AuthService,
    private teamService: TeamService,
    private dialog: MatDialog
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
          this.openDialog("You need to be registered to access this page");
          return of(false);
        })
      );
    }
  }

  openDialog(errorMsg): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: "450px",
      data: errorMsg,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.auth.logout();
    });
  }
}
