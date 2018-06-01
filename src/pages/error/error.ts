import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'error.html'
})

export class ErrorPage {
  error: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.error = navParams.get('error');
  }
}
