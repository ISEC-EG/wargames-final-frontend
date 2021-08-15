import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { SnackbarService } from "src/app/core/helper/snackbar.service";
import { ChallengeService } from "src/app/core/http/challenge/challenge.service";
import { TeamService } from "src/app/core/http/team/team.service";
import { Challenge } from "src/app/core/interfaces/challenge/challenge";
import { ChallengeSolvedComponent } from "../../entry-components/challenge-solved/challenge-solved.component";
import { MessageComponent } from "../../entry-components/message/message.component";
import { saveAs } from "file-saver";

@Component({
  selector: "app-challenge-page",
  templateUrl: "./challenge-page.component.html",
  styleUrls: ["./challenge-page.component.scss"],
})
export class ChallengePageComponent implements OnInit {
  challengeID: string = "";
  challenge: Challenge;

  submitFlagForm: FormGroup;

  teamID: string = "";

  titleIsWeb: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    this.teamID = this.activeRoute.snapshot.data.teamInfo.userID;
    this.submitFlagForm = this.initsubmitFlagForm();

    this.route.params.subscribe((params) => {
      this.challengeID = params["challengeID"];
      this.challenge = this.getTheChallenge(this.challengeID);
      if ((this.challenge.category === 'web') || (this.challenge.category === 'warm_up web')) {
        this.titleIsWeb = true;
      }
    });
  }

  initsubmitFlagForm() {
    return this.formBuilder.group({
      flag: new FormControl("", [
        Validators.required,
        Validators.pattern(/^ASCWG{.*}$/),
      ]),
    });
  }

  get flag() {
    return this.submitFlagForm.get("flag");
  }

  solvedSuccessfully() {
    const challengeSolvedDialogConfig = new MatDialogConfig();
    challengeSolvedDialogConfig.panelClass = "challenge-successs";
    challengeSolvedDialogConfig.disableClose = false; 
    const challengeSolvedDialog = this.matDialog.open(
      ChallengeSolvedComponent,
      challengeSolvedDialogConfig
    );
    challengeSolvedDialog.afterClosed().subscribe((data) => {});
  }

  getTheChallenge(challengeID: string) {
    return this.challengeService.challengeById(challengeID);
  }

  requestHint() {
    this.challengeService.requestHint(this.challengeID).subscribe(
      async (data) => {
        this.openDialog(data.hint);
        await this.teamService.updateTheScore(data.score);
        
      },
      (err) => {
        this.snackBarService.openSnackBar(err);
      }
    ); 
  }


  openDialog(hint): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: "450px",
      data: hint,
      ariaLabel: "Hint"
    });
  }

  async submitChallenge(challengeID: string) {
    if (this.submitFlagForm.valid) {
      try {
        if (!this.challenge.solved) {
          let submitChallenge = await this.challengeService
            .submitFlag(challengeID, this.flag.value)
            .toPromise();
          if (submitChallenge) await this.solvedSuccessfully();
          this.challengeService.setChallengeAsSolved(challengeID);
          this.teamService.updateTeamScore(this.challenge);
          this.submitFlagForm.reset();
        } else {
          return this.snackBarService.openSnackBar(
            "Challenge already solved before"
          );
        }
      } catch (e) {
        return this.snackBarService.openSnackBar(e);
      }
    } else {
      if (this.flag.errors && this.flag.errors.pattern)
        return this.snackBarService.openSnackBar(
          "Flag must start with ASCWG ❌"
        );
      return this.snackBarService.openSnackBar("Flag required ❌");
    }
 
  }

  downloadFile(challengeFileName: string) {
    this.challengeService.downloadFile(challengeFileName).subscribe(data => {
      saveAs(data.body, `${this.challenge.title}_ASC.rar`);
  });
  
  }

  goToLink(link) {
    window.open(`${link}`, "_blank");
  }
}
