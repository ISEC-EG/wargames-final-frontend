import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScoreBoardComponent } from 'src/app/components/score-board/score-board.component';
import { SidesModule } from '../sides/sides.module';
import { RankContentComponent } from 'src/app/components/score-board/rank-content/rank-content.component';
import { SharedModules } from '../shared/shared-modules.module';
import { AuthGuardService } from 'src/app/core/authentication/authGuard.service';



const routes: Routes = [
  {
    path: "",
    component: ScoreBoardComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: '',
    component: ScoreBoardComponent,
  } 
]

@NgModule({
  declarations: [
    ScoreBoardComponent,
    RankContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidesModule,
    SharedModules,
  ]
})
export class ScoreBoardModule { }
