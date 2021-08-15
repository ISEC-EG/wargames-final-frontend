import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration-main",
  templateUrl: "./registration-main.component.html",
  styleUrls: ["./registration-main.component.scss"],
})
export class RegistrationMainComponent implements OnInit {
  signupURL = false
  signInURL = false
  link : string = ""

  constructor(private router: Router ) {
    
  }

  ngOnInit() {
    
    this.link = this.router.url;
    if(this.link === "/entry/login"){
      this.signInURL = false;
    }
    if(this.link === "/entry/signup"){
      this.signupURL = true;
    }

    
  }
  

  gotoSignIn() {
    this.router.navigate(["/entry/login"], { replaceUrl: false });
  }
  gotoSignUp() {
    this.router.navigate(["/entry/signup"], { replaceUrl: false });
  }
}
