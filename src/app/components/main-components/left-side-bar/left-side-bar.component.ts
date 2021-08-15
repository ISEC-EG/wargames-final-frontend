import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/authentication/auth.service";
import { SnackbarService } from "src/app/core/helper/snackbar.service";
import { TeamService } from "src/app/core/http/team/team.service";
import { TeamProfileInfo } from "src/app/core/interfaces/team/teamProfileInfo";
import { WargamesTime } from "src/app/core/interfaces/time/challengeTime";
import { SocketIOService } from "src/app/core/socket/socket-io.service";

@Component({
  selector: "app-left-side-bar",
  templateUrl: "./left-side-bar.component.html",
  styleUrls: ["./left-side-bar.component.scss"],
})
export class LeftSideBarComponent implements OnInit {
  @Input() gameTime: number;
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  chanege: boolean = false;
  changeTeamNameForm: FormGroup;
  teamInfo: TeamProfileInfo;

  name: string = "";
  isLoading: boolean = false;

  isGameStart: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private teamService: TeamService,
    private snackBar: SnackbarService,
    private activeRoute: ActivatedRoute,
    private socket: SocketIOService
  ) { }

  ngOnInit() {
    this.teamInfo = this.activeRoute.snapshot.data.teamInfo;
    this.changeTeamNameForm = this.initTeamNameForm();

    this.socket.setupSocketConnection();

    this.isLoading = true;
    this.changeTeamNameForm = this.initTeamNameForm();
    // if (this.gameTime <= 0) {
      // this.isGameStart = true;
    // }

  }

  initTeamNameForm() {
    return this.formBuilder.group({
      teamName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern("^[A-Za-z0-9 ]+$"),
      ]),
    });
  }

  async getTeams(pageIndex, pageSize) {
    await this.teamService
      .dashboard(pageIndex, pageSize)
      .subscribe((teams) => { });
  }

  get name_team() {
    return this.changeTeamNameForm.get("teamName");
  }

  settings() {
    this.router.navigate(["/settings"], { replaceUrl: false });
  }

  changeName() {
    this.chanege = !this.chanege;
    if (this.changeTeamNameForm.valid) {
      this.name = this.name_team.value;
      this.teamService.updateName(this.name).subscribe((data) => {
        this.snackBar.openSnackBar(data["message"] + "✔️");
      });
    } else {
      this.name = this.teamInfo.name;
      if (
        this.name_team.errors &&
        (this.name_team.errors.minlength || this.name_team.errors.maxlength)
      )
        return this.snackBar.openSnackBar(
          "Team name must be more than 4 (characters, numbers) and less than 25 without spaces ❌"
        );
      else if (this.name_team.errors && this.name_team.errors.pattern)
        return this.snackBar.openSnackBar(
          "Team name must be (characters, numbers) only❌"
        );
    }

  }

  changeEditor() {
    this.chanege = !this.chanege;
  }

  logout() {
    this.authService.logout();
  }

  goToMyProfile() {
    this.router.navigate([`profile/${this.teamInfo._id}`]);
  }
}
