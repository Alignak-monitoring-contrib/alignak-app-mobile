import { Component } from '@angular/core';
import {IonicPage, NavParams, AlertController, InfiniteScroll, NavController} from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {Utils} from "../../common/utils";
import {ServicePage} from "../item/item";

@IonicPage()
@Component({
  selector: 'page-hostservices',
  templateUrl: 'hostservices.html',
})
/**
 * Class who manage host services data
 */
export class HostServicesPage {
  private nextPage = 'service';
  public readonly services = [];
  public readonly host = {};

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {AlertController} alertCtrl - alert controller (to display popups)
   * @param {NavParams} navParams - navigator parameter to get host data
   * @param {BackendClient} client - client for backend requests
   */
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public navParams: NavParams, public client: BackendClient) {
    this.host = navParams.get('host');
    this.addServices('service');
  }

  /**
   * Add services to services list (when {@link nextPage})
   * @param {string} endpoint - endpoint of request
   */
  private addServices(endpoint: string): void {
    this.client.getHostServices(endpoint, this.host)
      .subscribe(
        function(data) {
          this.services = this.services.concat(data['_items']);
          if (data['_links']['next'] != undefined)
            this.nextPage = data['_links']['next']['href'];
          else
            this.nextPage = undefined;
        }.bind(this)
      );
  }

  /**
   * Return the formated check date of item
   * @param {Object} service - service item data
   * @returns {string} - formated date
   */
  private static getCheckDate(service: Object): string {
    return Utils.getDate(service);
  }

  /**
   * Do infinite scroll and add services
   * @param {InfiniteScroll} infiniteScroll - infiniteScroll object
   */
  public doInfinite(infiniteScroll: InfiniteScroll): void {
    setTimeout(() => {
      if (this.nextPage) {
        this.addServices(this.nextPage);
      }

      infiniteScroll.complete();
    }, 500);
  }

  /**
   * Display an alert with output of given service
   * @param {Object} service - service item data
   */
  public displayInfo(service: Object): void {
    let alert = this.alertCtrl.create({
      title: 'Service ' + service['name'],
      subTitle: 'My output',
      message: service['ls_output'] + ' (' + HostServicesPage.getCheckDate(service) + ')',
      buttons: ['OK'],
    });
    alert.present();
  }

  /**
   * TODO: not implemented
   */
  public addAction(): void {
    let alert = this.alertCtrl.create({
      title: 'Please be patient :)',
      message: 'Not yet implemented',
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * Return formated item name for host or service
   * @param {Object} item - item backend data
   * @returns {string} formated name
   */
  public getItemName(item: Object): string {
    if (!item)
      item = this.host;
    return Utils.getItemName(item)
  }

  /**
   * Push to {@link ServicePage} with given item data
   * @param {Object} item - item backend data
   */
  public openPage(item: Object): void {
    this.navCtrl.push(ServicePage, {item})
  }
}
