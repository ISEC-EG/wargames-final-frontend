import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { BehaviorSubject, Observable, throwError } from "rxjs";
import { map, retry } from "rxjs/operators";
import { AllChallenges } from "../../interfaces/challenge/challenge";
import { Hint } from "../../interfaces/challenge/hint";

@Injectable({
  providedIn: "root",
})
export class ChallengeService {
  public challenges$ = new BehaviorSubject<AllChallenges>(null);

  public hint$ = new BehaviorSubject<Hint>(null);

  public get all_challenges(): AllChallenges {
    return this.challenges$.value;
  }

  public get hintInfo(): Hint {
    return this.hint$.value;
  }

  constructor(private http: HttpClient) { }

  Challenges(): Observable<AllChallenges> {
    return this.http
      .get(`${environment.host}/challenge/all`, {
        observe: "body",
        withCredentials: true,
      })
      .pipe(
        map((challengesInfo: AllChallenges) => {
          this.challenges$.next(challengesInfo);
          return this.challenges$.value;
        }),
        retry(2)
      );
  }

  challengeById(id) {
    let challenge = this.challenges$.value.challenges.find(
      (el) => el._id === id
    );
    return challenge;
  }

  submitFlag(challengeID: string, flag: string) {
    return this.http.post(
      `${environment.host}/challenge/answer/${challengeID}`,
      { flag },
      {
        withCredentials: true,
      }
    );
  }

  setChallengeAsSolved(challengeID: string) {
    let challenge = this.all_challenges.challenges.find(
      (ch) => ch._id === challengeID && ch.solved === true
    );
    if (challenge) return throwError("challenge already solved before");
    this.all_challenges.challenges.map((ch) => {
      if (ch._id === challengeID) ch.solved = true;
      return ch;
    });
  }

  requestHint(challengeID: string) {
    return this.http
      .get(`${environment.host}/challenge/hint/${challengeID}`, {
        observe: "body",
      })
      .pipe(
        map((hint: Hint) => {
          this.hint$.next(hint);
          return hint;
        }),
        retry(0)
      );
  }

  // downloadFile(challengeFileName: string): Observable<Blob> {
  //   return this.http
  //     .get(`${environment.host}/challenge/download/${challengeFileName}`, {
  //       responseType: 'blob'
  //     });
  // }

  downloadFile(challengeFileName: string) {
    return this.http.get(`${environment.host}/challenge/download/${challengeFileName}`, {
      observe: "response",
      responseType: "blob",
    });
  }
}
