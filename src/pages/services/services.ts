import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  private readonly services: {};
  private readonly hostname;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.services = navParams.get('services');
    this.hostname = navParams.get('hostname');
    console.log('Services: ', this.services)
  }

}
