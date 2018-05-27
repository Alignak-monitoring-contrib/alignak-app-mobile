import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BackendClient} from "../../../backend/client.service";
import {Utils} from "../../../common/utils";
import {HostPage, ServicePage} from "../../item/item";


@IonicPage()
@Component({
  templateUrl: 'problemslist.html',
})
/**
 * Class who manage a list of problem items
 */
export class ProblemsListPage {
  private readonly state: string;
  private readonly nextPage = undefined;
  public itemType: string;
  public problems = [];

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {NavParams} navParams - navigator parameters
   * @param {BackendClient} client - backend client for requests
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    this.state = this.navParams.get('state');
    this.itemType = this.navParams.get('itemType');
    this.nextPage = this.navParams.get('itemType');
    this.addProblems();
  }

  /**
   * Add problems for current state (when {@link nextPage})
   */
  private addProblems(): void {
    this.client.getProblems(this.nextPage, this.state)
      .subscribe(
        function(data) {
          this.problems = this.problems.concat(data['_items'].filter(
            h => h['active_checks_enabled'] || h['passive_checks_enabled']
          ));
          if (data['_links']['next'] != undefined) {
            this.nextPage = data['_links']['next']['href'];
          }
          else
            this.nextPage = undefined;
        }.bind(this)
      );
  }

  /**
   * Return formated host name
   * @param {Object} item - backend item data
   * @returns {string} host name
   */
  public getItemName(item: Object): string {
    return Utils.getItemName(item)
  }

  /**
   * Return ion name for current {@link itemType}
   * @returns {string} icon name
   */
  public getIconName(): string {
    if (this.itemType == 'host')
      return 'list-box';
    else
      return 'cube'
  }

  /**
   * Do infinite scroll and add problems to problems list
   * @param {InfiniteScroll} infiniteScroll - infinite scroll Object
   */
  public doInfinite(infiniteScroll: InfiniteScroll): void {
    setTimeout(() => {
      if (this.nextPage) {
        this.addProblems();
      }
      infiniteScroll.complete();
    }, 500);
  }

  /**
   * Push to given page name with given item data
   * @param {string} pageName - name of page to push
   * @param {Object} item - backend item data
   */
  public openPage(pageName: string, item: Object): void {
    if (pageName == 'host')
      this.navCtrl.push(HostPage, {item: item});
    if (pageName == 'service')
      this.navCtrl.push(ServicePage, {item: item} )
  }
}
