import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { BackendComponent } from "../backend/client.component";
import { BackendClient } from "../backend/client.service";
import { WrongLogin } from "../pages/badlogin/wrong";
import {HostPage} from "../pages/host/host";
import {ServicesPage} from "../pages/services/services";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    WrongLogin,
    BackendComponent,
    HostPage,
    ServicesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HostPage,
    ServicesPage,
    WrongLogin,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackendClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
