import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {HostServicesPage} from "./hostservices/hostservices";
import {Utils} from '../../common/utils'


@IonicPage()
abstract class ItemPage {
  public item: {};

  protected constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
  }

  public getCheckDate(): string {
    // Return check date
    return Utils.getDate(this.item)
  }

  public getHostName(): string {
    // Return formatted host name
    return Utils.getItemName(this.item);
  }

  public itemIsHost(): boolean {
    // TODO
    return !this.item['host']
  }
}

@Component({
  selector: 'page-hostsynthesis',
  templateUrl: 'hostsynthesis.html',
})
export class HostSynthesisPage extends ItemPage {
  public services = [];
  public item: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    super(navCtrl, navParams, client);
    this.item = this.navParams.get('item');
    console.log('HS item: ', this.item);
    this.client.getHostServices('service', this.navParams.get('item'))
      .subscribe(
        function(data) {
          this.services = data['_items'];
        }.bind(this)
      );
  }

  public openServicesPage(): void {
    // Push to HostServices page
    this.navCtrl.push(HostServicesPage, {host: this.item})
  }

}

@Component({
  selector: 'page-hostsynthesis',
  templateUrl: 'hostsynthesis.html',
})
export class ServicePage extends ItemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    super(navCtrl, navParams, client);
    this.item = this.navParams.get('item');
  }
}
