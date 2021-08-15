import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { WargamesTime } from "../../interfaces/time/challengeTime";

@Injectable({
  providedIn: "root",
})
export class TimeService {
  private wargamesTime$ = new BehaviorSubject<WargamesTime>(null);

  constructor(private http: HttpClient) {}

  public get wargames_date() {
    return this.wargamesTime$.value;
  }

  compentationTime(): Observable<WargamesTime> {
    if (this.wargames_date === null) {
      return this.http
        .get(`${environment.host}/time/`, { observe: "body" })
        .pipe(
          map((compentationDate: WargamesTime) => {
            
            return compentationDate;
          })
        );
    }
    return this.wargamesTime$;
  }

  wargamesStartTime(): Observable<WargamesTime> {
    return this.http.get(`${environment.host}/time/`, { observe: "body" }).pipe(
      map((compentationDate: WargamesTime) => {
        return compentationDate;
      })
    );
  }
}
