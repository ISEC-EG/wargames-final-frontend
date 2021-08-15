import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideBarComponent } from 'src/app/components/main-components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from 'src/app/components/main-components/right-side-bar/right-side-bar.component';
import { LogoHomeComponent } from 'src/app/components/main-components/logo-home/logo-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/entry-components/spinner/spinner.component';
import { SpinnerCircleComponent } from 'src/app/components/entry-components/spinner-circle/spinner-circle.component';

@NgModule({
  declarations: [
    LeftSideBarComponent,
    RightSideBarComponent,
    LogoHomeComponent,
    SpinnerComponent,
    SpinnerCircleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LeftSideBarComponent,
    RightSideBarComponent,
    LogoHomeComponent,
    SpinnerComponent,
    SpinnerCircleComponent
  ],
  entryComponents: [SpinnerComponent, SpinnerCircleComponent]
})
export class SidesModule { }
