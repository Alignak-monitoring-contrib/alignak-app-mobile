import {Component, Pipe, PipeTransform} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {HostServicesPage} from "./hostservices/hostservices";

@Pipe({name: 'getKeys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}

@IonicPage()
@Component({
  selector: 'page-hostsynthesis',
  templateUrl: 'hostsynthesis.html',
})
export class HostSynthesisPage {
  private readonly host: {};
  public services = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    this.host = this.navParams.get('host');
    this.client.getHostServices('service', this.navParams.get('host'))
      .subscribe(
        function(data) {
          this.services = data['_items'];
        }.bind(this)
      );
  }

  public getCheckDate(): string {
    // Return check date
    if (!this.host['ls_last_check']){
      return 'Not yet checked'
    } else {
      return new Date(this.host['ls_last_check'] * 1000).toLocaleString() || 'Error';
    }
  }

  public getHostName(): string {
    // Return formatted host name
    let name = this.host['name'];
    if (this.host['alias'])
      name = this.host['alias'];

    if (name.includes('_')) {
      let splitname = name.split('_');
      name = splitname.join(' ');
    }

    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  public openServicesPage(): void {
    // Push to HostServices page
    this.navCtrl.push(HostServicesPage, {host: this.host})
  }

}
