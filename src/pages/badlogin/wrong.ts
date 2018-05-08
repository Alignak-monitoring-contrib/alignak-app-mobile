import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-wrong',
  templateUrl: 'wrong.html'
})
export class WrongLogin {
  error: string;
  constructor(
    public navCtrl: NavController, public navParams: NavParams
  ) {
    this.error = navParams.get('error');
  }
}
