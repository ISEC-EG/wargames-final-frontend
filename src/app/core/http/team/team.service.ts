import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Register_Team } from "../../interfaces/team/teamRegister";
import { BehaviorSubject, Observable } from "rxjs";
import { map, retry, shareReplay } from "rxjs/operators";
import { TeamProfileInfo } from "../../interfaces/team/teamProfileInfo";
import { Dashboard, Team, Team_Page } from "../../interfaces/team/dashboard";
import { Challenge } from "../../interfaces/challenge/challenge";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  public teamProfileInfo$ = new BehaviorSubject<TeamProfileInfo>(null);

  teams: Team[] = [];

  teams_page: Team_Page[] = [];

  public dashboardTeams$ = new BehaviorSubject<Team[]>(this.teams);

  public teams_page$ = new BehaviorSubject<number[]>([]);
  public count_teams$ = new BehaviorSubject<number>(null);

  public teams_page_no$ = new BehaviorSubject<Team_Page[]>(this.teams_page);

  public get team_profile_information(): TeamProfileInfo {
    return this.teamProfileInfo$.value;
  }

  public get dashboard_information(): Team[] {
    return this.dashboardTeams$.value;
  }

  public get count_teams(): number {
    return this.count_teams$.value;
  }

  constructor(private http: HttpClient) {}

  csrfToken() {
    return this.http.get(`${environment.host}/profile`);
  }

  signup(registerData: Register_Team) {
    return this.http.post(`${environment.host}/team/signup.json`, registerData);
  }

  sendOTP() {
    return this.http.post(
      `${environment.host}/team/verification-code.json`,
      {}
    );
  }

  verifyCode(otpData) {
    return this.http.post(`${environment.host}/team/verify.json`, otpData);
  }

  login(data) {
    return this.http.post(`${environment.host}/team/login.json`, data);
  }

  forgetPassword(email) {
    return this.http.post(`${environment.host}/team/forget-password`, {
      email,
    });
  }

  resetPassword(password) {
    return this.http.post(`${environment.host}/team/reset-password`, {
      password,
    });
  }

  myProfileInfo(): Observable<TeamProfileInfo> {
    if (this.team_profile_information === null) {
      return this.http
        .get(`${environment.host}/team/profile`, {
          observe: "body",
          withCredentials: true,
        })
        .pipe(
          map((teamProfileInfo: TeamProfileInfo) => {
            this.teamProfileInfo$.next(teamProfileInfo);
            return this.teamProfileInfo$.value;
          }),
          retry(2)
        );
    } else return this.teamProfileInfo$;
  }

  generateCredentials(): Observable<any> {
    return this.http
      .get(`${environment.host}/team/generate-credentials.json`, {
        withCredentials: true,
      })
      .pipe(
        map((token: string) => {
          return token;
        }),
        retry(2)
      );
  }

  logout() {
    return this.http.post(
      `${environment.host}/team/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  dashboard(pageNo, limit): Observable<Team[]> {
    if (!this.teams_page$.value.includes(pageNo)) {
      this.teams_page$.next([...this.teams_page$.value, pageNo]);
      return this.http
        .get(
          `${environment.host}/team/dashboard?pageNo=${pageNo}&limitNo=${limit}`,
          {
            observe: "body",
            withCredentials: true,
          }
        )
        .pipe(
          map((teams: Dashboard) => {
            if (this.dashboard_information.length === 0) {
              this.dashboardTeams$.next(teams.teams);
              this.count_teams$.next(teams.count);
            } else {
              this.dashboardTeams$.next([
                ...this.dashboard_information,
                ...teams.teams,
              ]);
              this.count_teams$.next(teams.count);
            }
            this.teams_page_no$.next([
              ...this.teams_page_no$.value,
              { pageNo: pageNo, pageData: teams.teams },
            ]);
            return teams.teams;
          }),
          shareReplay({ bufferSize: 1, refCount: true }),
          retry(2)
        );
    } else {
      let teams$ = new BehaviorSubject<Team[]>(this.teams);
      teams$.next(
        this.teams_page_no$.value.find((el) => el.pageNo === pageNo).pageData
      );

      return teams$;
    }
  }

  updateDashBoardNewPages(pageNo) {
    this.teams_page$.next([
      ...this.teams_page$.value.filter((el) => {
        return el !== pageNo;
      }),
    ]);
  }

  profileById(id: string): Observable<TeamProfileInfo> {
    return this.http
      .get(`${environment.host}/team/profile/${id}`, {
        observe: "body",
        withCredentials: true,
      })
      .pipe(
        map((teamProfileInfo: TeamProfileInfo) => {
          return teamProfileInfo;
        }),
        retry(2)
      );
  }

  updateTeamScore(challenge: Challenge) {
    this.team_profile_information.score += challenge.points;
    this.team_profile_information.solutions.push({
      points: challenge.points,
      challenge,
      updatedAt: new Date(),
    });
  }

  updateTheScore(score: number) {
    this.team_profile_information.score = score;
  }

  updatePassword(oldPassword, newPassword) {
    return this.http.patch(`${environment.host}/team/update-password`, {
      oldPassword,
      newPassword,
    });
  }

  updateName(name): Observable<object> {
    return this.http
      .patch(
        `${environment.host}/team/team-name`,
        { name },
        {
          observe: "body",
          withCredentials: true,
        }
      )
      .pipe(
        map((updateInfo: object) => {
          this.team_profile_information.name = name;
          return updateInfo;
        }),
        retry(2)
      );
  }
}
