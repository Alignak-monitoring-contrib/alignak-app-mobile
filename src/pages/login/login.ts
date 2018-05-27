import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

import { BackendClient} from "../../backend/client.service";
import { WrongLogin } from "../badlogin/wrong";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
/**
 * Class who manage user login (Homepage of application)
 */
export class LoginPage {
  private readonly backend_url: string;
  private readonly username: string;
  private readonly password: string;

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {HttpClient} http - http client for backend service
   */
  constructor(public navCtrl: NavController, private http: HttpClient
  ) {
    if (localStorage.getItem('url')) {
      this.backend_url = localStorage.getItem('url')
    }
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username')
    }
  }

  /**
   * Login to backend with current url, username and password
   */
  public doLogin(): void {
    localStorage.setItem("url", this.backend_url);
    localStorage.setItem('username', this.username);

    let client = new BackendClient(this.http);
    client.login(this.username, this.password)
      .subscribe(
        function(data) {
          localStorage.setItem("token", data['token']);

          this.navCtrl.setRoot(LoginPage);
          this.navCtrl.setRoot('Dashboard');
        }.bind(this),
          err => this.navCtrl.push(
            WrongLogin, {error: err.message || "Can't join the server."}
            )
      );
    }

  /**
   * Catch event when user type in password or push login button
   * @param {number} keyCode - key code of type event
   */
  public eventHandler(keyCode: number): void {
    // Catch when user type ENTER in "this.password"
    if (keyCode === 13){
      this.doLogin()
    }
  }
}
