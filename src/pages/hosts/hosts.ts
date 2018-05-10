import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";


@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})

export class HostsPage {
  public hosts: {};
  public colors = { up: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
  this.colors.up = 'secondary';
    this.client.get_hosts().subscribe(
      function(data) {
        this.hosts = data['_items'];
        console.log('Hosts ', this.hosts)
      }.bind(this)

    )
  }

}
