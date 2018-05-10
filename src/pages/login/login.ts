import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";

import { BackendClient} from "../../backend/client.service";
import { WrongLogin } from "../badlogin/wrong";

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {
  private backend: string;
  private username: string;
  private password: string;

  constructor(
    public navCtrl: NavController,
    private http: HttpClient
  ) {}

    login()
    {
      let client = new BackendClient(this.http);
      localStorage.setItem("url", this.backend);
      client.login(this.username, this.password)
        .subscribe(
          function(data) {
            localStorage.setItem("token", data['token']);
              this.navCtrl.setRoot('Dashboard');
          }.bind(this),
            err => this.navCtrl.push(
              WrongLogin, {error: err.message || "Can't join the server."}
              )
        );
    }
}
