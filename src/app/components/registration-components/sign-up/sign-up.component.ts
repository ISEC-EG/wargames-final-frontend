import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AuthService } from "src/app/core/authentication/auth.service.js";
import { HelperService } from "src/app/core/helper/helper.service.js";
import { SnackbarService } from "src/app/core/helper/snackbar.service.js";
import { TeamService } from "src/app/core/http/team/team.service.js";
import { PasswordValidator } from "src/app/core/validation/password.validator.js";
import { All } from "../../../core/data/data.js";
// import { OtpComponent } from "src/app/components/registration-components/otp/otp.component";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  loged: boolean = false;
  allCountriesArr: any = [];
  countryValue: string = "";
  countryFlag = false;
  // private composeVerificationDialog: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private snackBar: SnackbarService,
    private helperService: HelperService,
    private authService: AuthService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.allCountriesArr = All;
    this.signupForm = this.initSignupForm();
  }

  initSignupForm() {
    return this.formBuilder.group(
      {
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern("^[A-Za-z0-9 ]+$"),
        ]),
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /(?=^.{8,}$)((?=.*\d)(?=.*\W+)).*$/
            ),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /(?=^.{8,}$)((?=.*\d)(?=.*\W+)).*$/
            ),
          ],
        ],
        teamSecret: new FormControl("", [Validators.required]),
      },
      { validator: PasswordValidator }
    );
  }

  get teamName() {
    return this.signupForm.get("name");
  }

  get email() {
    return this.signupForm.get("email");
  }

  get password() {
    return this.signupForm.get("password");
  }

  get confirmPassword() {
    return this.signupForm.get("confirmPassword");
  }

  get teamSecret() {
    return this.signupForm.get("teamSecret");
  }
  get country() {
    return this.signupForm.get("country");
  }


  // composeVerification() {
  //   const composeVerificationDialogConfig = new MatDialogConfig();
  //   composeVerificationDialogConfig.data = "signup";
  //   composeVerificationDialogConfig.panelClass = "verify";
  //   composeVerificationDialogConfig.disableClose = true;
  //   if (this.composeVerificationDialog === null) {
  //     this.composeVerificationDialog = this.matDialog.open(
  //       OtpComponent,
  //       composeVerificationDialogConfig
  //     );
  //   }
  //   if (this.composeVerificationDialog !== null) {
  //     this.composeVerificationDialog.afterClosed().subscribe((data) => { });
  //   }
  // }

  async submitSignupForm() {
    this.loged = true;
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      try {
        let registerData = {
          name: this.teamName.value.trim(),
          email: this.email.value.trim(),
          password: this.password.value,
          secret: this.signupForm.value.teamSecret,
          country: this.countryValue.trim(),
        };
        console.log(registerData);
        
        let signupData = await this.teamService.signup(registerData).toPromise();
        await this.authService.logoutTemp();
        await this.authService.logout();
        this.signupForm.reset();
        await this.authService.logIn(signupData);
      } catch (error) {
        this.loged = false;
        return this.helperService.alert(error, true);
      }
    } else {
      this.loged = false;
      if (
        this.teamName.errors &&
        (this.teamName.errors.minlength || this.teamName.errors.maxlength)
      )
        return this.snackBar.openSnackBar(
          "Team name must be more than 4 (characters, numbers) and less than 25 without spaces ❌"
        );
      else if (this.teamName.errors && this.teamName.errors.pattern)
        return this.snackBar.openSnackBar(
          "Team name must be (characters, numbers) only❌"
        );
      else if (this.email.errors && this.email.errors.email)
        return this.snackBar.openSnackBar("Enter a valid Email ❌");
      else if (this.password.errors && this.password.errors.pattern)
        return this.snackBar.openSnackBar(
          "Password not allowed Must contain characters, numbers and at least one special and capital character ❌"
        );
      else if (this.signupForm.errors && this.signupForm.hasError("misMatch"))
        return this.snackBar.openSnackBar(
          "Confirm password and password not match ❌"
        );
        else if (this.signupForm.valid && this.countryValue === "")
        return this.snackBar.openSnackBar("Please select your country ❌");
    }
  }
  countrySelected(e) {
    this.countryValue = e.value;
    this.countryFlag = true;
  }
}
