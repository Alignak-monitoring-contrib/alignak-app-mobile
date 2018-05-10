import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

import { BackendClient} from "../../backend/client.service";
import { WrongLogin } from "../badlogin/wrong";

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {
  private readonly backend_url: string;
  private readonly username: string;
  private readonly password: string;

  constructor(public navCtrl: NavController, private http: HttpClient
  ) {
    if (localStorage.getItem('url')) {
      this.backend_url = localStorage.getItem('url')
    }
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username')
    }
  }

    doLogin()
    {
      let client = new BackendClient(this.http);
      localStorage.setItem("url", this.backend_url);
      localStorage.setItem('username', this.username);

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

  eventHandler(keyCode) {
    // Catch when user type ENTER in "this.password"
    if (keyCode === 13){
      this.doLogin()
    }
  }
}