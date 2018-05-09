import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  public data = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App
  ) {
    this.data = this.navParams.get('data');
    console.log('In Dashboard ', this.data)
  }

  openPage(page: string, data: {}){
    console.log('Open page in dashboard');
    this.navCtrl.push(page, data);
    this.navCtrl.setRoot(page, data);
    this.data = data;
  }
}
