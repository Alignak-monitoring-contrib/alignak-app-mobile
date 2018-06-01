import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'error.html'
})

export class ErrorPage {
  error: string;
  constructor(public navParams: NavParams) {
    this.error = navParams.get('error');
  }
}
