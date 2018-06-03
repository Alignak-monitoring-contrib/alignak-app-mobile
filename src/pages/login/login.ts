import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

import { BackendClient} from "../../backend/client.service";
import { ErrorPage } from "../error/error";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
/**
 * Class who manage user login (Homepage of application)
 */
export class LoginPage {
  private readonly _backend_url: string;
  private readonly _username: string;
  private _password: string;

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {HttpClient} http - http client for backend service
   */
  constructor(public navCtrl: NavController, private http: HttpClient
  ) {
    if (localStorage.getItem('url')) {
      this._backend_url = localStorage.getItem('url')
    }
    if (localStorage.getItem('username')) {
      this._username = localStorage.getItem('username')
    }
  }

  /**
   * @returns {string} _backend_url
   */
  public get backend_url(): string {return this._backend_url}

  /**
   * @returns {string} _username
   */
  public get username(): string {return this._username}

  /**
   * Login to backend with current url, username and password
   */
  public doLogin(): void {
    localStorage.setItem("url", this._backend_url);
    localStorage.setItem('username', this._username);

    let client = new BackendClient(this.http);
    client.login(this._username, this._password)
      .subscribe(
        function(data) {
          localStorage.setItem("token", data['token']);

          this.navCtrl.setRoot(LoginPage);
          this.navCtrl.setRoot('DashboardPage');
        }.bind(this),
          err => this.navCtrl.push(
            ErrorPage, {error: err.message || "Can't join the server."}
            )
      );
    }

  /**
   * Catch event when user type in password or push login button
   * @param {number} keyCode - key code of type event
   */
  public eventHandler(keyCode: number): void {
    if (keyCode === 13){
      this.doLogin()
    }
  }
}
