import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {BackendClient} from "../backend/client.service";

@Component({
  templateUrl: 'app.html',
  providers: [BackendClient]
})
/**
 * Main class of Alignak App Mobile
 */
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'LoginPage';

  /**
   * @param {Platform} platform - platform Object
   * @param {StatusBar} statusBar - status bar Object
   * @param {SplashScreen} splashScreen - splash screen Object
   * @param {BackendClient} backend - backend client
   */
  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public backend: BackendClient) {
    this.initializeApp()

  }

  /**
   * Initialize application
   */
  private initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Set as root the given page and reset content nav (to avoid get back button)
   * @param {string} page
   */
  public openPage(page: string) {
    this.nav.setRoot(page);
  }

  /**
   * Log out of backend, reset token
   */
  public logOut(): void {
    this.backend.token = '';
    this.nav.setRoot(this.rootPage);
  }

}
