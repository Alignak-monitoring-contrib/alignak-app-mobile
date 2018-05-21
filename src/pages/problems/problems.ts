import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";


@IonicPage()
@Component({
  selector: 'page-problems',
  templateUrl: 'problems.html',
})
export class ProblemsPage {
  servicesProblems = [];
  hostsProblems = [];

  constructor(public client: BackendClient) {
    this.collectProblems()
  }

  collectProblems(): void {
    let problemServiceStates = ['CRITICAL', 'WARNING'];
    for (let problemService in problemServiceStates){
      this.client.getProblems('service', problemServiceStates[problemService])
        .subscribe(
          function(data) {
            this.servicesProblems = this.servicesProblems.concat(data['_items']);
          }.bind(this)
        );
    }
    let problemHostStates = ['DOWN'];
    for (let problemHost in problemHostStates){
      this.client.getProblems('host', problemHostStates[problemHost])
        .subscribe(
          function(data) {
            this.hostsProblems = this.hostsProblems.concat(data['_items']);
          }.bind(this)
        );
    }
  }


}
