import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})
export class HostsPage {
  public data: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
    this.navParams.get('data');
  }

  openPage(page: string, data: {}){
    this.navCtrl.push(page, data);
    this.navCtrl.setRoot(page, data);
    this.data = data;
  }
}
