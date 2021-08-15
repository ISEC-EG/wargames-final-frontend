import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamService } from "src/app/core/http/team/team.service";
import { Team } from "src/app/core/interfaces/team/dashboard";
import { SocketIOService } from "src/app/core/socket/socket-io.service";

@Component({
  selector: "app-score-board",
  templateUrl: "./score-board.component.html",
  styleUrls: ["./score-board.component.scss"],
})
export class ScoreBoardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isLoading: boolean = false;
  teamsLoader: boolean = false;

  teamsArr: Team[] = [];

  pageSize: number = 6;
  currentPage: number = 0;
  length: number = 300;
  

  socketIO: any;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private socket: SocketIOService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    await this.getTeams(this.currentPage, this.pageSize);

    this.paginator.page.subscribe(async (paginateResult) => {
      this.teamsLoader = true;
      this.currentPage = paginateResult.pageIndex;
      await this.getTeams(paginateResult.pageIndex, paginateResult.pageSize);
    });
  }

  ngAfterViewChecked() {
    this.socket.socketIO.on("update_dashboard", async (data) => {
      await this.teamService.updateDashBoardNewPages(this.currentPage);
      await this.getTeams(this.currentPage, this.pageSize);
    });

    this.socket.socketIO.on("request_hint", async (data) => {
      await this.teamService.updateDashBoardNewPages(this.currentPage);
      await this.getTeams(this.currentPage, this.pageSize);
    });
  }

  goToProfile(id: string) {
    this.router.navigate([`/profile/${id}`], { replaceUrl: false });
  }

  async getTeams(pageIndex, pageSize) {
    await this.teamService
      .dashboard(pageIndex, pageSize)
      .subscribe((teams: Team[]) => {
        this.teamsArr = teams;
        this.length = this.teamService.count_teams;
        this.isLoading = false;
        this.teamsLoader = false;
      });
  }

  ngOnDestroy() {
    this.socket.socketIO.disconnect();

    this.socket.socketIO.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        
      }
    });
  }
}
