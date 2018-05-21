import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import {BackendClient} from "../backend/client.service";

@Component({
  templateUrl: 'app.html',
  providers: [BackendClient]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public backend: BackendClient) {
    this.initializeApp()

  }

  private initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

  public logOut(): void {
    this.backend.token = '';
    this.nav.setRoot(this.rootPage);
  }

}

