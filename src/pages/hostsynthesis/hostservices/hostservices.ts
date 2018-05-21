import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hostservices',
  templateUrl: 'hostservices.html',
})
export class HostServicesPage {
  private readonly services: {};
  public readonly hostname;

  constructor(public alertCtrl: AlertController, public navParams: NavParams) {
    this.services = navParams.get('services');
    this.hostname = navParams.get('hostname');
    console.log('Services: ', this.services)
  }

  public displayInfo(service: {}): void {
    let alert = this.alertCtrl.create({
      title: 'Service ' + service['name'],
      subTitle: 'My output',
      message: service['ls_output'] + ' (' + HostServicesPage.getCheckDate(service) + ')',
      buttons: ['OK'],
    });
    alert.present();
  }

  public addAction(): void {
    let alert = this.alertCtrl.create({
      title: 'Please be patient :)',
      message: 'Not yet implemented',
      buttons: ['OK']
    });
    alert.present();
  }

  private static getCheckDate(service: {}): string {
    if (!service['ls_last_check']){
      return 'Not yet checked'
    }else
    {
      return new Date(service['ls_last_check'] * 1000).toLocaleString() || 'Error';
    }
  }

}
