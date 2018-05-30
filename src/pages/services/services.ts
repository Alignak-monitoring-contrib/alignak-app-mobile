import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';

import {BackendClient} from "../../backend/client.service";
import {ServicePage} from "../item/item";
import {Utils} from "../../common/utils";

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})

/**
 * Class who display services
 */
export class ServicesPage {
  private host: Object;
  public services = [];
  public colors = {up: 'up', unreachable: 'unreachable', down: 'down' };
  public nextPage = 'service';
  public criteria = '';

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {NavParams} navParams - navigator controller
   * @param {BackendClient} client - backend client to get data
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    this.host = navParams.get('host');
    this.addServices();
  }

  /**
   * Add services to current services list (GET request on next page endpoint)
   */
  private addServices(): void {
    this.client.getHostServices(this.nextPage, this.host).subscribe(
      function(data) {
        this.services = this.services.concat(data['_items']);
        if (data['_links']['next'] != undefined)
          this.nextPage = data['_links']['next']['href'];
        else
          this.nextPage = undefined;
      }.bind(this)
    )
  }

  /**
   * Compare function to filter services for current criteria
   * @param {Object} item - given item to filter
   * @returns {number} index number
   */
  public compare = (item: Object): number =>  {
    let field = 'ls_state';
    let criteria = this.criteria;
    if (this.criteria.includes(':')) {
      field = this.criteria.split(':', 2)[0];
      criteria = this.criteria.split(':', 2)[1];
    }
    // To prevent wrong input field
    if (item[field] == undefined)
      field = 'ls_state';

    if (typeof item[field] === "string"){
      if (item[field] == criteria || item[field].includes(criteria))
        return -1;
      if (!item[field].includes(criteria))
        return 1;
    }
    if (typeof item[field] === "boolean"){
      if (item[field])
        return -1;
      if (!item[field])
        return 1;
    }

    return 0;
  };

  /**
   * Event handler for key press in input
   */
  public eventHandler(): void {
    this.services = this.services.sort(this.compare)
  }

  /**
   * Return formated service name
   * @param {Object} service - service item data
   * @returns {string} service name
   */
  public getItemName(service: {}): string {
    return Utils.getItemName(service)
  }

  /**
   * Push to {@link ServicePage} with given service data
   * @param {Object} service - service item data
   */
  public displayService(service: Object): void {
    this.navCtrl.push(ServicePage, {item: service})
  }

  /**
   * Do infinite scroll, add services if {@link nextPage}
   * @param {InfiniteScroll} infiniteScroll - infinite scroll object
   */
  public doInfinite(infiniteScroll: InfiniteScroll): void {
    setTimeout(() => {
      if (this.nextPage) {
        this.addServices();
      }
      infiniteScroll.complete();
    }, 500);
  }
}
