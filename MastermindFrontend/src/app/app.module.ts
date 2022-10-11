import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { GameboardComponent } from './gameboard/gameboard.component';
import { AttemptComponent } from './attempt/attempt.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppChosenColorDirective } from './app-chosen-color.directive';
import { LogComponent } from './log/log.component';
import { RequestFilterPipe } from './request-filter.pipe';
import {BASE_PATH} from "../openapi";
import {environment} from "../environments/environment";
import {LogInterceptor} from "./log.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    AttemptComponent,
    AppChosenColorDirective,
    LogComponent,
    RequestFilterPipe
  ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
    ],
  providers: [
    {provide: BASE_PATH, useValue: environment.basePath},
    {provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
