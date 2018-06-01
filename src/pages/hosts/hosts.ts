import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController} from 'ionic-angular';

import {BackendClient} from "../../backend/client.service";
import {HostPage} from "../item/item";
import {Utils} from "../../common/utils";

@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})

/**
 * Class who display hosts list
 */
export class HostsPage {
  public hosts = [];
  public colors = {up: 'up', unreachable: 'unreachable', down: 'down' };
  public nextPage = 'host';
  public criteria = '';

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {BackendClient} client - backend client to get data
   */
  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.addHosts();
  }

  /**
   * Add hosts to current host list (GET request on next page endpoint)
   */
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

  /**
   * Compare function to filter hosts for current criteria
   * @param {Object} item - given item to filter
   * @returns {number} index number
   */
  public compare = (item: Object): number =>  {
    let field = 'ls_state';
    let criteria;
    if (this.criteria.includes(':')) {
      field = this.criteria.split(':', 2)[0];
      criteria = this.criteria.split(':', 2)[1];
    } else
      criteria = this.criteria;

    if (criteria === '' || item[field] === undefined)
      return 0;

    if (typeof item[field] === "string"){
      if (item[field] == criteria)
        return -1;
      if (item[field].indexOf(criteria) !== -1)
        return -1;
      else
        return 1;
    }
    if (typeof item[field] === "boolean"){
      if (item[field] == (criteria == 'true'))
        return -1;
      else
        return 1;
    }

    return 0;
  };

  /**
   * Event handler for key press in input
   */
  public eventHandler(): void {
    this.hosts = this.hosts.sort(this.compare)
  }

  /**
   * Return formated host name
   * @param {Object} host - host item data
   * @returns {string} host name
   */
  public getHostName(host: {}): string {
    // Return formatted host name
    return Utils.getItemName(host)
  }

  /**
   * Push to {@link HostPage} with given host data
   * @param {Object} host - host item data
   */
  public displayHost(host: Object): void {
    this.navCtrl.push(HostPage, {item: host})
  }

  /**
   * Do infinite scroll, add host if {@link nextPage}
   * @param {InfiniteScroll} infiniteScroll - infinite scroll object
   */
  public doInfinite(infiniteScroll: InfiniteScroll): void {
    setTimeout(() => {
      if (this.nextPage) {
        this.addHosts();
      }
      infiniteScroll.complete();
    }, 500);
  }
}
