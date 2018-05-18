import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {BackendClient} from "../../backend/client.service";
import {HostSynthesisPage} from "../hostsynthesis/hostsynthesis";

@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})

export class HostsPage {
  public hosts: {};
  public colors = {up: 'up', unreachable: 'unreachable', down: 'down' };

  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.client.getHosts().subscribe(
      function(data) {
        this.hosts = data['_items'];
      }.bind(this)

    )
  }

  public displayHost(host){
    this.navCtrl.push(HostSynthesisPage, {host: host})
  }

}
