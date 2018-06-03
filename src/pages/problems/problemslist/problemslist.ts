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
  private readonly _state: string;
  private readonly _nextPage = undefined;
  public itemType: string;
  public problems = [];

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {NavParams} navParams - navigator parameters
   * @param {BackendClient} client - backend client for requests
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    this._state = this.navParams.get('state');
    this._nextPage = this.navParams.get('itemType');
    this.itemType = this.navParams.get('itemType');
    this.addProblems();
  }

  /**
   * @returns {string} _state
   */
  public get state(): string {return this._state};

  /**
   * @returns {string} _nextPage
   */
  public get nextPage(): string {return this._nextPage};

  /**
   * Add problems for current state (when {@link _nextPage})
   */
  private addProblems(): void {
    this.client.getProblems(this._nextPage, this._state)
      .subscribe(
        function(data) {
          this.problems = this.problems.concat(data['_items'].filter(
            h => h['active_checks_enabled'] || h['passive_checks_enabled']
          ));
          if (data['_links']['next'] != undefined) {
            this._nextPage = data['_links']['next']['href'];
          }
          else
            this._nextPage = undefined;
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
      if (this._nextPage) {
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
