import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})
export class HostsPage {
  public data: {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
  }

  openPage(page: string, data: {}){
    this.navCtrl.push(page, data);
    this.navCtrl.setRoot(page, data);
    this.data = data;
  }
}
