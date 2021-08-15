import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { TeamService } from "src/app/core/http/team/team.service";
import {
  Solution,
  TeamProfileInfo,
} from "src/app/core/interfaces/team/teamProfileInfo";

@Component({
  selector: "app-score-details",
  templateUrl: "./score-details.component.html",
  styleUrls: ["./score-details.component.scss"],
})
export class ScoreDetailsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  challenges: Solution[] = [];
  pageSize: number = 6;
  currentPage: number = 0;
  length: number = 0;

  profileInfo: TeamProfileInfo = null;
  teamID: string = "";

  name: string = "";
  nameClass: boolean = false;
  newLine: boolean = false;

  isLoading: boolean = false;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.teamID = params["id"];
      this.profile(this.teamID).then((data) => {
        this.profileInfo = data;
        this.challenges = this.profileInfo.solutions;
        this.length = this.challenges.length;
        this.isLoading = false;
        this.checkName();
      });
    });

    if (!this.isLoading) {
      this.paginator.page.subscribe((data) => {
        this.currentPage = data.pageIndex;
      });
    }
  }

  async profile(id: string): Promise<TeamProfileInfo> {
    let team = await this.teamService.profileById(id).toPromise();
    return team;
  }

  checkName() {
    this.name = this.profileInfo.name;
    this.newLine = false;
    let spaces = this.name.split(" ").length - 1;
    if (this.name.length <= 12) {
      this.nameClass = false;
    } else if (this.name.length > 12) {
      this.nameClass = true;
      console.log(this.name);
    }
    if (spaces >= 3) {
      this.newLine = true;
      this.nameClass = true;
    }
  }
}
