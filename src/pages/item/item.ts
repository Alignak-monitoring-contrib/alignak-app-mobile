import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {HostServicesPage} from "../hostservices/hostservices";
import {Utils} from '../../common/utils'


/**
 * Classe who display an item
 */

@IonicPage()
abstract class ItemPage {
  public item: {};
  protected shownGroup;

  /**
   * @param navCtrl - navigator controller
   * @param navParams - navigator parameters to get item
   */
  protected constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shownGroup = null;
    this.item = this.navParams.get('item');
  }

  /**
   * Return formatted check date of item
   * @returns {string}
   */
  protected getCheckDate(): string {
    return Utils.getDate(this.item)
  }

  /**
   * Return formatted item name
   * @returns {string}
   */
  protected getItemName(): string {
    return Utils.getItemName(this.item);
  }

  /**
   * Return if item is an host or not
   * @returns {boolean}
   */
  protected itemIsHost(): boolean {
    return !this.item['host']
  }

  /**
   * Return icon name (host or service)
   * @returns {string}
   */
  protected getIconName(): string {
    if (this.itemIsHost())
      return 'list-box';
    else
      return 'cube';
  }

  /**
   * Return if item has customs or not
   * @returns {boolean}
   */
  protected haveCustoms(): boolean {
    return !(Object.keys(this.item['customs']).length === 0);
  }

  /**
   * Fill group for items if customs are shown or not
   * @param customs - customs
   */
  protected toggleGroup(customs: Object) {
    if (this.isGroupShown(customs)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = customs;
    }
  };
  protected isGroupShown(group) {
    return this.shownGroup === group;
  };
}

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
/**
 * @extends ItemPage
 */
export class HostPage extends ItemPage {
  public services = [];
  public item: {};

  /**
   * Display host
   * @param navCtrl
   * @param navParams
   * @param client - client for backend to get services for host
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    super(navCtrl, navParams);

    // Get services for host
    this.client.getHostServices('service', this.navParams.get('item'))
      .subscribe(
        function(data) {
          this.services = data['_items'];
        }.bind(this)
      );
  }

  /**
   * Push to {@link HostServicesPage}
   */
  public openServicesPage(): void {
    this.navCtrl.push(HostServicesPage, {host: this.item})
  }

}

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
/**
 * @extends ItemPage
 */
export class ServicePage extends ItemPage {

  /**
   * Display service
   * @param navCtrl - navigator controller
   * @param navParams - navigator parameters to get item
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl, navParams);
  }
}
