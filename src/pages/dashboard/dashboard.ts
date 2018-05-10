import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BackendClient } from "../../backend/client.service";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [BackendClient]
})
export class Dashboard {
  public data = {hosts: {}, services: {}, nb_items: {host: 0, service: 0, total: 0}};
  public livesynthesis = {
    monitored: {host: 0, service: 0, total: 0},
    problems: {host: 0, service: 0, total: 0},
  };

  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.client.get_livesynthesis().subscribe(
      function (data) {
        this.livesynthesis.monitored.host = data['_items'][0]['hosts_total'];
        this.livesynthesis.monitored.service = data['_items'][0]['services_total'];
        this.livesynthesis.monitored.total = data['_items'][0]['hosts_total'] + data['_items'][0]['services_total'];
        }.bind(this),
          err => console.log('Synth err', err)
    )
  }

}
