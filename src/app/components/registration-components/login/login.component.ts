
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { TeamService } from "src/app/core/http/team/team.service.js";

import { HelperService } from "src/app/core/helper/helper.service";
import { AuthService } from "src/app/core/authentication/auth.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { OtpComponent } from "../otp/otp.component";
import { SnackbarService } from "src/app/core/helper/snackbar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loged: boolean = false;

  private composeVerificationDialog: any = null;

  constructor(
    
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private helperService: HelperService,
    private authService: AuthService,
    public matDialog: MatDialog,
    private snackbar: SnackbarService
  ) {}
  ngOnInit() {
    this.loginForm = this.initLoginForm();
  }

  initLoginForm() {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: ["", [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password_login() {
    return this.loginForm.get("password");
  }

  composeVerification(data: string) {
    const composeVerificationDialogConfig = new MatDialogConfig();
    composeVerificationDialogConfig.data = data;
    composeVerificationDialogConfig.panelClass = "verify";
    composeVerificationDialogConfig.disableClose = false;
    if (this.composeVerificationDialog === null) {
      this.composeVerificationDialog = this.matDialog.open(
        OtpComponent,
        composeVerificationDialogConfig
      );
    }

    this.composeVerificationDialog.afterClosed().subscribe((data) => {
      this.loged = false;
    });
  }

  async submitLoginForm() {
    this.loged = true;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      try {
        await this.authService.logoutTemp();
        await this.authService.logout();
        let signData = await this.teamService
          .login(this.loginForm.value)
          .toPromise();

        if (signData) {
          await this.authService.logIn(signData);
        }
        // } else if (sign && sign["verified"] === false) {
        //   await this.authService.logInTemp(sign);
        //   await this.composeVerification("login");
        // }
      } catch (error) {
        this.loged = false;
        return this.helperService.alert(error, true);
      }
    }
  }

  async GoToForgetPassword() {
    this.loged = true
    await this.authService.logoutTemp();
    await this.authService.logout();
    if (
      this.email.value !== "" ||
      (this.email.value !== undefined && this.email.valid)
    ) {
      this.teamService.forgetPassword(this.email.value).subscribe(
        async (token) => {
          await this.authService.logInTemp(token);
          await this.composeVerification("forget");
        },
        (err) => {
          this.helperService.alert(err, true);
          this.loged = false;
        }
      );
    } else {
      this.loged = false;
      this.snackbar.openSnackBar("Please Enter a valid email address ❌");
    }
  }

  
}
