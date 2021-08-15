import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { take, map } from "rxjs/operators";
import { Observable } from "rxjs";;
import { WargamesTime } from "../interfaces/time/challengeTime";
import { TimeService } from "../http/time/time.service";

@Injectable({
  providedIn: "root",
})
export class CompetitionTimeResolve implements Resolve<Observable<WargamesTime> | WargamesTime> {
  constructor(
    private timeService: TimeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.timeService.compentationTime().pipe(
        take(1),
        map((competationTime) => competationTime)
      );
  }
}
