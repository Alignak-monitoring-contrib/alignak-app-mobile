import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {HostServicesPage} from "../hostservices/hostservices";
import {Utils} from '../../common/utils'


@IonicPage()
abstract class ItemPage {
  public item: {};
  public shownGroup;

  protected constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
  }

  public getCheckDate(): string {
    // Return check date
    return Utils.getDate(this.item)
  }

  public getItemName(): string {
    // Return formatted item name
    return Utils.getItemName(this.item);
  }

  public itemIsHost(): boolean {
    // TODO
    return !this.item['host']
  }

  public getIconName(): string {
    if (this.itemIsHost())
      return 'list-box';
    else
      return 'cube';
  }

  public haveCustoms(): boolean {
    // TODO
    return !(Object.keys(this.item['customs']).length === 0);
  }

  public toggleGroup(group) {
    // TODO
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  public isGroupShown(group) {
    return this.shownGroup === group;
  };
}

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class HostPage extends ItemPage {
  public services = [];
  public item: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    super(navCtrl, navParams, client);
    this.item = this.navParams.get('item');
    this.shownGroup = null;
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
    this.shownGroup = null;
  }

}

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ServicePage extends ItemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    super(navCtrl, navParams, client);
    this.item = this.navParams.get('item');
  }
}
