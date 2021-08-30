import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamService } from "src/app/core/http/team/team.service";
import { Team } from "src/app/core/interfaces/team/dashboard";
import { SocketIOService } from "src/app/core/socket/socket-io.service";
import { trigger, transition, query, style, stagger, animate, keyframes, group, animateChild, state } from '@angular/animations';
import { Subscription } from "rxjs";

@Component({
  selector: "app-score-board",
  templateUrl: "./score-board.component.html",
  styleUrls: ["./score-board.component.scss"],
  animations: [
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ])
  ]
})
export class ScoreBoardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isLoading: boolean = false;
  teamsLoader: boolean = false;
  length = 10;

  teamsArr: Team[] = [];

  pageSize: number = 10;
  currentPage: number = 0;
  slide = false


  socketIO: any;
  sup : Subscription

  constructor(
    private router: Router,
    private teamService: TeamService,
    private socket: SocketIOService
  ) {
    
   }

  async ngOnInit() {
    this.isLoading = true;
    await this.getTeams(this.currentPage, this.pageSize);
    this.sup
    this.slide = true
    
      
    
    

    // this.paginator.page.subscribe(async (paginateResult) => {
    //   this.teamsLoader = true;
    //   this.currentPage = paginateResult.pageIndex;
    //   await this.getTeams(paginateResult.pageIndex, paginateResult.pageSize);
    // });
  }

  ngAfterViewChecked() {
    this.socket.socketIO.on("update_dashboard", async (data) => {
      
      this.slide = true

      await this.teamService.updateDashBoardNewPages(this.currentPage);
      

      await this.getTeams(this.currentPage, this.pageSize);
      

      

    });

    this.socket.socketIO.on("request_hint", async (data) => {
      await this.teamService.updateDashBoardNewPages(this.currentPage);
      await this.getTeams(this.currentPage, this.pageSize);
      // this.slide =true


    });
  }

  goToProfile(id: string) {
    this.router.navigate([`/profile/${id}`], { replaceUrl: false });
  }

  async getTeams(pageIndex, pageSize) {
    this.sup = await this.teamService
      .dashboard(pageIndex, pageSize)
      .subscribe((teams: Team[]) => {
        
        this.teamsArr = teams;
        // this.length = this.teamService.count_teams;
        this.isLoading = false;
        this.length=10;
        this.teamsLoader = false;
        
        
      });
  }

  ngOnDestroy() {
    this.socket.socketIO.disconnect();

    this.socket.socketIO.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {

      }
    });
    console.log("212");
    
    this.sup.unsubscribe()
  }
  
}
function anima(): any {
  return trigger('listAnimation', [
    transition('* => *', [

      query(':enter', style({ opacity: 0 }), { optional: true }),

      query(':enter', stagger('700ms', [
        animate('1s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
          style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
        ]))]), { optional: true })
    ]),
  ])
}

