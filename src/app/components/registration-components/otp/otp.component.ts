import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/authentication/auth.service";
import { HelperService } from "src/app/core/helper/helper.service";
import { TeamService } from "src/app/core/http/team/team.service";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.scss"],
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  errorOtp = false;
  verify : boolean = false

  constructor(
    private dialogRef: MatDialogRef<OtpComponent>,
    private teamService: TeamService,
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.otpForm = this.initOtpForm();

    if (this.data === "login" || this.data === "signup") {
      this.teamService.sendOTP().subscribe(
        (response) => {},
        (err) => {
          this.helperService.alert(err, true);
          this.dialogRef.close();
        }
      );
    }

    this.otp.valueChanges.subscribe((data) => {
      this.errorOtp = false;
    });
  }

  initOtpForm() {
    return this.formBuilder.group({
      otp: new FormControl("", [Validators.required , Validators.minLength(6)]),
    });
  }

  get otp() {
    return this.otpForm.get("otp");
  }

  close() {
    this.dialogRef.close({
      closed: true,
    });
  }

  async verifyOTP() {
    this.verify = true ;
    if (this.otpForm.valid) {
      try {
        let verificationResponse = await this.teamService
          .verifyCode({ otp: this.otp.value })
          .toPromise();
        if (this.data === "login" || this.data === "signup") {
          await this.authService.logoutTemp();
          await this.authService.logout();
          await this.authService.logIn(verificationResponse);
        } else {
          this.router.navigate(["/entry/forget"], { replaceUrl: false });
        }

        this.dialogRef.close();
      } catch (error) {
        this.helperService.alert(error, true);
        this.verify = false ;
      }
    } else {
      this.errorOtp = true;
      
    }
  }
}
