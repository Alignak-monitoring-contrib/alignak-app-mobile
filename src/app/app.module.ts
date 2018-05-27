import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { BackendClient } from "../backend/client.service";
import { WrongLogin } from "../pages/badlogin/wrong";
import {HostPage, ServicePage} from "../pages/item/item";
import {HostServicesPage} from "../pages/hostservices/hostservices";
import {SharedModule} from "../common/shared.module";
import {ProblemsListPage} from "../pages/problems/problemslist/problemslist";

@NgModule({
  declarations: [
    MyApp,
    WrongLogin,
    HostPage,
    HostServicesPage,
    ServicePage,
    ProblemsListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HostPage,
    HostServicesPage,
    ServicePage,
    WrongLogin,
    ProblemsListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackendClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
