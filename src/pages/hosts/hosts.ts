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
  public criteria = '';

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

  public compare = (item): number =>  {
    // Compare item criteria for a given value or not
    let field = 'ls_state';
    let criteria = this.criteria;
    if (this.criteria.includes(':')) {
      field = this.criteria.split(':', 2)[0];
      criteria = this.criteria.split(':', 2)[1];
    }
    // To prevent wrong input field
    if (item[field] == undefined)
      field = 'ls_state';

    if (item[field] == criteria || item[field].includes(criteria))
      return -1;
    if (!item[field].includes(criteria))
      return 1;

    return 0;
  };

  eventHandler() {
    // Catch when user type in input
    this.hosts = this.hosts.sort(this.compare)
  }

  public displayHost(host): void {
    // Push to HostSynthesis Page
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
