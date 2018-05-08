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
  private token: string;
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
      this.token = '';
      this.http.post(
        this.backend+'/login',
        body)
        .subscribe(
          function(data) {
            this.token = data.token;
            this.navCtrl.push(AlignakHome, {data: data, http: this.http, url: this.backend})
          }.bind(this),
          function(err){
            console.log((err.statusText || "Can't join the server."));
            this.navCtrl.push(WrongLogin)
          }.bind(this)

        );
    }
}
