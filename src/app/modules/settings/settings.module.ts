import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { SidesModule } from '../sides/sides.module';
import { SharedModules } from '../shared/shared-modules.module';


const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  } , 
  
]

@NgModule({
  declarations: [
    SettingsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidesModule,
    SharedModules,
  ],
  entryComponents: [],
})
export class SettingsModule { }
