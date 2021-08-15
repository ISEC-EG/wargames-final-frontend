import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SidesModule } from "../sides/sides.module";
import { SharedModules } from "../shared/shared-modules.module";
import { ChallengesComponent } from "src/app/components/challenges/challenges.component";
import { ChallengeItemComponent } from "src/app/components/challenges/challenge-item/challenge-item.component";
import { ChallengePageComponent } from "src/app/components/challenges/challenge-page/challenge-page.component";
import { ChallengeSolvedComponent } from "src/app/components/entry-components/challenge-solved/challenge-solved.component";
import { AuthGuardService } from "src/app/core/authentication/authGuard.service";

const routes: Routes = [
  {
    path: "",
    component: ChallengesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ":challengeID",
    component: ChallengePageComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    ChallengesComponent,
    ChallengeItemComponent,
    ChallengePageComponent,
    ChallengeSolvedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidesModule,
    SharedModules,
  ],
  entryComponents: [ChallengeSolvedComponent],
})
export class ChallengesModule {}
