import { Injectable } from "@angular/core";
import {
  
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { TimeService } from "../http/time/time.service";
import { WargamesTime } from "../interfaces/time/challengeTime";
import { MatDialog } from "@angular/material";
import { MessageComponent } from "src/app/components/entry-components/message/message.component";

@Injectable({
  providedIn: "root",
})
export class DateGuardService implements CanActivate {
  wargamesTime: WargamesTime = null;
  gameTime: Date;
  currentTime: Date;

  constructor(
    
    private timeService: TimeService,
    private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.wargamesCompetationStartTime();
  }

  wargamesCompetationStartTime() {
    return this.timeService.wargamesStartTime().pipe(
      map((dates: WargamesTime) => {
        this.gameTime = new Date(dates.challengeTime);
        this.currentTime = new Date(dates.currentTime);
        if (this.gameTime.getTime() > this.currentTime.getTime()) {
          this.openDialog("The filtration phase not started yet");
          return false;
        }
        let endTime =
          this.gameTime.getTime() / 1000 +
          24 * 60 * 60 -
          this.currentTime.getTime() / 1000;
        if (endTime <= 0) {
          this.openDialog("The filtration phase has been ended");
          return false;
        }
        return true;
      }),
      catchError((err) => {
        this.openDialog(err.message);
        return of(false);
      })
    );
  }

  openDialog(errorMsg) {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: "450px",
      data: errorMsg,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
