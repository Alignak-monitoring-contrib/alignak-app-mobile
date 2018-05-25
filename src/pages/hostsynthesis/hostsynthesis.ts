import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {HostServicesPage} from "./hostservices/hostservices";
import {Utils} from '../../common/utils'


@IonicPage()
@Component({
  selector: 'page-hostsynthesis',
  templateUrl: 'hostsynthesis.html',
})
export class HostSynthesisPage {
  private readonly host: {};
  public services = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    this.host = this.navParams.get('host');
    this.client.getHostServices('service', this.navParams.get('host'))
      .subscribe(
        function(data) {
          this.services = data['_items'];
        }.bind(this)
      );
  }

  public getCheckDate(): string {
    // Return check date
    return Utils.getDate(this.host)
  }

  public getHostName(): string {
    // Return formatted host name
    let name = this.host['name'];
    if (this.host['alias'])
      name = this.host['alias'];

    if (name.includes('_')) {
      let splitname = name.split('_');
      name = splitname.join(' ');
    }

    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  public openServicesPage(): void {
    // Push to HostServices page
    this.navCtrl.push(HostServicesPage, {host: this.host})
  }

}
