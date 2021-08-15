import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SnackbarService } from "src/app/core/helper/snackbar.service";
import { TeamService } from "src/app/core/http/team/team.service";
import { PasswordValidator } from "src/app/core/validation/password.validator";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  constructor(
    private snackBar: SnackbarService,
    private formBuilder: FormBuilder,
    
    private teamService: TeamService,
    
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.confirmChangePassword();
  }

  confirmChangePassword() {
    return this.formBuilder.group(
      {
        oldPassword: ["", [Validators.required]],
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

  get oldPassword() {
    return this.changePasswordForm.get("oldPassword");
  }

  get password() {
    return this.changePasswordForm.get("password");
  }

  get confirmPassword() {
    return this.changePasswordForm.get("confirmPassword");
  }

  async submitChangePassword() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      try {
        await this.teamService
          .updatePassword(this.oldPassword.value, this.password.value)
          .toPromise();
        this.snackBar.openSnackBar("Password changed successfully ✔️");
        this.changePasswordForm.reset();
      } catch (error) {
        return this.snackBar.openSnackBar(
          error + "❌"
        );
        
      }
    } else {
      if (this.password.errors && this.password.errors.pattern)
        return this.snackBar.openSnackBar(
          "Password not allowed Must contain characters, numbers and at least one special and capital character ❌"
        );
      else if (this.oldPassword.errors && this.oldPassword.errors.required)
        return this.snackBar.openSnackBar("old password is incorrect ❌");
      else if (
        this.changePasswordForm.errors &&
        this.changePasswordForm.hasError("misMatch")
      )
        return this.snackBar.openSnackBar(
          "Confirm password and password not match ❌"
        );
      else
        return this.snackBar.openSnackBar(
          "Please check password and confirm password"
        );
    }
  }

}
