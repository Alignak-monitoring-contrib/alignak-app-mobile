import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-host',
  templateUrl: 'host.html',
})
export class HostPage {
  private readonly host: {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.host = this.navParams.get('host');
    console.log(this.host)
  }

  public getCheckDate(){
    if (!this.host['ls_last_check']){
      return 'Not yet checked'
    }else
    {
      return new Date(this.host['ls_last_check'] * 1000).toLocaleString() || 'Not yet checked';
    }
  }

  public getHostName(){
    return this.host['name'].charAt(0).toUpperCase() + this.host['name'].slice(1)
  }

}
