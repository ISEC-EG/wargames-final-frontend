import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { PasswordValidator } from "src/app/core/validation/password.validator";
import { HelperService } from "src/app/core/helper/helper.service";
import { SnackbarService } from "src/app/core/helper/snackbar.service";
import { TeamService } from "src/app/core/http/team/team.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/authentication/auth.service";

@Component({
  selector: "app-reset",
  templateUrl: "./forget.component.html",
  styleUrls: ["./forget.component.scss"],
})
export class ForgetComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  submitted = false;
  loged : boolean = false;

  constructor(
    private snackBar: SnackbarService,
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private teamService: TeamService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.forgetPasswordForm = this.forgetPasswordFormInit();
  }

  forgetPasswordFormInit() {
    return this.formBuilder.group(
      {
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
            ),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
            ),
          ],
        ],
      },
      { validator: PasswordValidator }
    );
  }

  get password() {
    return this.forgetPasswordForm.get("password");
  }

  get confirmPassword() {
    return this.forgetPasswordForm.get("confirmPassword");
  }

  async submitNewPassword() {
    this.loged = true;
    this.forgetPasswordForm.markAllAsTouched();
    if (this.forgetPasswordForm.valid) {
      try {
        let forgetResult = await this.teamService
          .resetPassword(this.password.value)
          .toPromise();
        this.snackBar.openSnackBar(forgetResult["message"] + "❗ ✔️");
        this.authService.logoutTemp();
        this.router.navigate(["/entry/login"], { replaceUrl: true });
      } catch (error) {
        this.loged = false;
        return this.helperService.alert(error, true);
      }
    } else {
      this.loged = false;
      if (this.password.errors && this.password.errors.pattern)
        return this.snackBar.openSnackBar(
          "Password not allowed Must contain characters, numbers and at least one special and capital character ❌"
        );
      else if (
        this.forgetPasswordForm.errors &&
        this.forgetPasswordForm.hasError("misMatch")
      )
        return this.snackBar.openSnackBar(
          "Confirm password and password not match ❌"
        );
      else {
        this.loged = false;
        return this.snackBar.openSnackBar(
          "Please check password and confirm password"
        );
      }
    }
  }
}
