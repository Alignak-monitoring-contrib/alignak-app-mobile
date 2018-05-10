import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [BackendClient]
})
export class Dashboard {
  public data = {hosts: {}, services: {}, nb_items: {host: 0, service: 0, total: 0}};

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    // this.data = this.navParams.get('data');
    console.log(localStorage.getItem('url'))
    console.log('client url', client.url);
    console.log('client token', client.token)
    console.log('client http', client.http)

    this.client.get_data().subscribe(
      function (data) {
        this.hosts = data[0]['_items'];
        this.services = data[1]['_items'];

        let nb_host = data[0]['_items'].length;
        let nb_service = data[1]['_items'].length;
        let total = data[0]['_items'].length + data[1]['_items'].length;
        this.data = {
          hosts: data[0]['_items'],
          services: data[1]['_items'],
          nb_items: {host: nb_host, service: nb_service, total: total}
        };
        console.log('Data ', this.data);
      }.bind(this)
    );
  }

}
