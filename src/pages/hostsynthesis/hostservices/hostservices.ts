import { Component } from '@angular/core';
import {IonicPage, NavParams, AlertController, InfiniteScroll} from 'ionic-angular';
import {BackendClient} from "../../../backend/client.service";

@IonicPage()
@Component({
  selector: 'page-hostservices',
  templateUrl: 'hostservices.html',
})
export class HostServicesPage {
  private nextPage = 'service';
  public readonly services = [];
  public readonly host = {};

  constructor(public alertCtrl: AlertController, public navParams: NavParams, public client: BackendClient) {
    this.host = navParams.get('host');
    this.addServices('service');
  }

  public addServices(endpoint: string): void{
    this.client.getHostServices(endpoint, this.host)
      .subscribe(
        function(data) {
          this.services = this.services.concat(data['_items']);
          if (data['_links']['next'] != undefined)
            this.nextPage = data['_links']['next']['href'];
          else
            this.nextPage = undefined;
        }.bind(this)
      );
  }

  public doInfinite(infiniteScroll: InfiniteScroll): void {
    // Add services when trigger infiniteScroll event

    setTimeout(() => {
      if (this.nextPage) {
        this.addServices(this.nextPage);
      }

      infiniteScroll.complete();
    }, 500);
  }

  public displayInfo(service: {}): void {
    // Display output of given service
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
