import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";


@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})

export class HostsPage {
  public hosts: {};
  public colors = {up: 'up', unreachable: 'unreachable', down: 'down' };

  constructor(public client: BackendClient) {
    this.client.get_hosts().subscribe(
      function(data) {
        this.hosts = data['_items'];
      }.bind(this)

    )
  }

}
