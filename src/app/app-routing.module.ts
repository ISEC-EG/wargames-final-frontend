import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Four0forComponent } from "./components/four0for/four0for.component";
import { ScoreDetailsComponent } from "./components/score-details/score-details/score-details.component";
import { AuthGuardService } from "./core/authentication/authGuard.service";
import { HomeGuardService } from "./core/authentication/homeGuard.service";
import { ChallengesResolveService } from "./core/resolves/challenge.service";
import { TeamResolveService } from "./core/resolves/team-resolve.service";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/landing/landing.module").then((m) => m.LandingModule),
    canActivate: [HomeGuardService],
    resolve: {
      teamInfo: TeamResolveService
    },
  },
  {
    path: "score-board",
    loadChildren: () =>
      import("./modules/score-board/score-board.module").then(
        (m) => m.ScoreBoardModule
      ),
    resolve: {
      teamInfo: TeamResolveService
    },
  },
  {
    path: "challenges",
    loadChildren: () =>
      import("./modules/challenges/challenges.module").then(
        (m) => m.ChallengesModule
      ),
    resolve: {
      teamInfo: TeamResolveService,
      allChallenges: ChallengesResolveService,
    },
  },
  {
    path: "rules",
    loadChildren: () =>
      import("./modules/rules/rules.module").then((m) => m.RulesModule),
    resolve: {
      teamInfo: TeamResolveService
    },
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./modules/settings/settings.module").then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuardService],
    resolve: {
      teamInfo: TeamResolveService
    },
  },
  {
    path: "entry",
    loadChildren: () =>
      import("./modules/register/register.module").then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: "profile/:id",
    pathMatch: "full",
    component: ScoreDetailsComponent,
    resolve: {
      teamInfo: TeamResolveService,
    },
  },
  {
    path: "404",
    component: Four0forComponent,
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
