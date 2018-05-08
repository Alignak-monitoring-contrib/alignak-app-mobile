import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'page-alignak',
  templateUrl: 'alignak.html'
})
export class AlignakHome {
  token: string;
  url: string;
  http: HttpClient;
  data = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams
  ) {
    this.token = navParams.get('data').token;
    this.http = navParams.get('http');
    this.url = navParams.get('url');
    // this.data = [];

    this.get('host');

  }

  get(endpoint: string) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Token', this.token);

    this.http.get(
      this.url + '/' + endpoint, {headers}
    ).subscribe(
        data => this.display_data(data),
        err => console.log(err)
      )
  }

  display_data(data: {}){
    this.data = data['_items'];
    console.log(this.data);
  }
}
