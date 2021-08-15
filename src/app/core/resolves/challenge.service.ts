import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { take, map, catchError } from "rxjs/operators";
import { empty, Observable } from "rxjs";
import { TokenService } from "../authentication/token.service";
import { AllChallenges } from "../interfaces/challenge/challenge";
import { ChallengeService } from "../http/challenge/challenge.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { MessageComponent } from "src/app/components/entry-components/message/message.component";
import { SpinnerComponent } from "src/app/components/entry-components/spinner/spinner.component";

@Injectable({
  providedIn: "root",
})
export class ChallengesResolveService
  implements Resolve<Observable<AllChallenges> | any>
{
  constructor(
    private challengeService: ChallengeService,
    private tokenService: TokenService,
    private _router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SpinnerComponent>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinnerDialog();
    if (this.tokenService.token) {
      if (this.challengeService.challenges$.value === null) {
        return this.challengeService.Challenges().pipe(
          map((allChallenges) => {
            this.dialog.closeAll();
            return allChallenges;
          }),
          catchError(async (err) => {
            this.openDialog(err);
            return this._router.navigate(["/"]);
          })
        );
      } else {
        this.dialog.closeAll();
        return this.challengeService.challenges$.value;
      }
    } else this.dialogRef.close();
    return empty();
  }

  async openDialog(errorMsg) {
    this.dialogRef = await this.dialog.open(MessageComponent, {
      width: "450px",
      data: errorMsg,
    });
  }

  spinnerDialog() {
    this.dialog.open(SpinnerComponent, {
      width: "100vw",
      height: "100vh",
    });
  }
}
