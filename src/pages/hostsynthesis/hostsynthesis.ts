import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {HostServicesPage} from "./hostservices/hostservices";


@IonicPage()
@Component({
  selector: 'page-hostsynthesis',
  templateUrl: 'hostsynthesis.html',
})
export class HostSynthesisPage {
  private readonly host: {};
  private readonly services: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    this.host = this.navParams.get('host');
    this.services = this.client.get_host_services(this.navParams.get('host'))
      .subscribe(
      function(data) {
        this.services = data['_items']
      }.bind(this)
    );
  }

  public getCheckDate(){
    if (!this.host['ls_last_check']){
      return 'Not yet checked'
    }else
    {
      return new Date(this.host['ls_last_check'] * 1000).toLocaleString() || 'Error';
    }
  }

  public getHostName(){
    return this.host['name'].charAt(0).toUpperCase() + this.host['name'].slice(1)
  }

  public openServicesPage(){
    this.navCtrl.push(HostServicesPage, {hostname: this.getHostName(), services: this.services})
  }

}
