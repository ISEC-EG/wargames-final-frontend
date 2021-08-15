import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamProfileInfo } from 'src/app/core/interfaces/team/teamProfileInfo';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  isTeamInfoExists: boolean = false;
  myTeamInfo: TeamProfileInfo;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myTeamInfo = this.activeRoute.snapshot.data.teamInfo;
    if (this.myTeamInfo !== null) this.isTeamInfoExists = true;
  }

}
