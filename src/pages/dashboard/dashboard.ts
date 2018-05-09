import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  data = {};

  constructor(
    public navCtrl: NavController, public navParams: NavParams
  ) {
    this.data = this.navParams.get('data')
  }
}
