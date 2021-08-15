import { RegistrationMainComponent } from "./../../components/registration-components/registration-main/registration-main.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "src/app/components/registration-components/login/login.component";
import { SignUpComponent } from "src/app/components/registration-components/sign-up/sign-up.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModules } from "../shared/shared-modules.module";
import { SidesModule } from "../sides/sides.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TempGuardService } from "src/app/core/authentication/tempGuard.service";
import { IsLoginService } from "src/app/core/authentication/isLogin.service";
import { ForgetComponent } from "src/app/components/registration-components/forget-password/forget.component";

const routes: Routes = [
  {
    path: "",
    component: RegistrationMainComponent,
    canActivate: [IsLoginService]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [IsLoginService]
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [IsLoginService]
  },
  {
    path: "forget",
    component: ForgetComponent,
    canActivate: [TempGuardService]
  },
];

@NgModule({
  declarations: [
    RegistrationMainComponent,
    LoginComponent,
    SignUpComponent,
    ForgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModules,
    SidesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
  ]
})
export class RegisterModule {}
