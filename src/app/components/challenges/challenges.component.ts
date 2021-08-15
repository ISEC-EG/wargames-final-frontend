import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";

import { AllChallenges } from "src/app/core/interfaces/challenge/challenge";

@Component({
  selector: "app-challenges",
  templateUrl: "./challenges.component.html",
  styleUrls: ["./challenges.component.scss"],
})
export class ChallengesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageSize: number = 4;
  currentPage: number = 0;
  pageIndex: number = 0;
  length: number = 0;
  loading = false;

  initialIdex = 0;
  pageLimit = 2;

  arr1 = [];
  arr2 = [];

  challengesArr = [];

  _challenges: AllChallenges = null;
  constructor(
    private router: Router,
    
    private activeRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this._challenges = this.activeRoute.snapshot.data.allChallenges;
    this.length = this._challenges.count;
    this.getChallenges();

    this.paginator.page.subscribe((paginateResult) => {
      this.pageIndex = paginateResult.pageIndex;
      this.getChallenges();
    });
  }

  goToChallenge(challengeID: string) {
    this.router.navigate([`/challenges/${challengeID}`], { replaceUrl: false });
  }

  getChallenges() {
    this.challengesArr = this._challenges.challenges.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    );
  }
}
