import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";


@IonicPage()
@Component({
  selector: 'page-problems',
  templateUrl: 'problems.html',
})
export class ProblemsPage {
  servicesProblems = [];
  hostsProblems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public client: BackendClient) {
    let problemServiceStates = ['CRITICAL', 'WARNING'];
    let problemHostStates = ['DOWN'];
    for (let problemService in problemServiceStates){
      this.client.getProblems('service', problemServiceStates[problemService])
        .subscribe(
          function(data) {
            this.servicesProblems = this.servicesProblems.concat(data['_items']);
            console.log('Service Problems:', this.servicesProblems)
          }.bind(this)
        );
    }
    for (let problemHost in problemHostStates){
      this.client.getProblems('host', problemHostStates[problemHost])
        .subscribe(
          function(data) {
            this.servicesProblems = this.servicesProblems.concat(data['_items']);
            console.log('Host Problems', this.servicesProblems)
          }.bind(this)
        );
    }

  }


}
