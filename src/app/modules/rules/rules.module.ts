import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RulesComponent } from 'src/app/components/rules/rules.component';
import { SidesModule } from '../sides/sides.module';
import { SharedModules } from '../shared/shared-modules.module';

const routes: Routes = [
  {
    path: '',
    component: RulesComponent
  }
]

@NgModule({
  declarations: [
    RulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidesModule,
    SharedModules,
  ]
})
export class RulesModule { }
