import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/authentication.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { HttpXsrfInterceptor } from './core/interceptors/csrf.interceptor';
import { HttpRequestInterceptor } from './core/interceptors/httpRequest.interceptor';
import { ToastBarComponent } from './components/entry-components/toast-bar/toast-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModules } from './modules/shared/shared-modules.module';
import { OtpComponent } from "src/app/components/registration-components/otp/otp.component";
import { ScoreDetailsComponent } from './components/score-details/score-details/score-details.component';
import { SidesModule } from './modules/sides/sides.module';
import { MessageComponent } from './components/entry-components/message/message.component';
import { SocketIOService } from "./core/socket/socket-io.service";
import { Four0forComponent } from './components/four0for/four0for.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastBarComponent,
    OtpComponent,
    ScoreDetailsComponent,
    MessageComponent,
    Four0forComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    FormsModule,
    SharedModules,
    SidesModule
  ],
  providers: [
    SocketIOService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  ],
  entryComponents: [ToastBarComponent , OtpComponent, MessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
