import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";

import { AlignakHome} from "../alignak/alignak";
import { WrongLogin} from "../badlogin/wrong";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private backend: string;
  private username: string;
  private password: string;


  constructor(
    public navCtrl: NavController,
    private http: HttpClient
  ) {}

    login()
    {
      let body = {
        username: this.username,
        password: this.password
      };
      this.http.post(
        this.backend+'/login',
        body)
        .subscribe(
          data => this.navCtrl.push(
            AlignakHome, {data: data, http: this.http, url: this.backend}),
          err =>
            this.navCtrl.push(
              WrongLogin, {error: err.message || "Can't join the server."})
        );
    }
}
