import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController} from 'ionic-angular';

import {BackendClient} from "../../backend/client.service";
import {HostSynthesisPage} from "../hostsynthesis/hostsynthesis";

@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})

export class HostsPage {
  public hosts = [];
  public colors = {up: 'up', unreachable: 'unreachable', down: 'down' };
  public nextPage = 'host';

  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.addHosts()
  }

  private addHosts(): void {
    this.client.getHosts(this.nextPage).subscribe(
      function(data) {
        this.hosts = this.hosts.concat(data['_items']);
        if (data['_links']['next'] != undefined)
          this.nextPage = data['_links']['next']['href'];
        else
          this.nextPage = undefined;
      }.bind(this)

    )
  }
  public displayHost(host): void {
    this.navCtrl.push(HostSynthesisPage, {host: host})
  }

  public doInfinite(infiniteScroll: InfiniteScroll): void {
    // Add host when trigger infiniteScroll event

    setTimeout(() => {
      if (this.nextPage) {
        this.addHosts();
      }
      infiniteScroll.complete();
    }, 500);
  }
}
