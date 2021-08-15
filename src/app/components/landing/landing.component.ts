import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CountdownComponent, CountdownConfig } from "ngx-countdown";
import { TeamProfileInfo } from "src/app/core/interfaces/team/teamProfileInfo";
import { WargamesTime } from "src/app/core/interfaces/time/challengeTime";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {

  myTeamInfo: TeamProfileInfo;
  isTeamInfoExists: boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.myTeamInfo = this.activeRoute.snapshot.data.teamInfo;
    if (this.myTeamInfo !== null) this.isTeamInfoExists = true;
  }

  goToLogin() {
    this.router.navigate(["/entry/login"], { replaceUrl: false });
  }

  goToSignUp() {
    this.router.navigate(["/entry/signup"], { replaceUrl: false });
  }

}
