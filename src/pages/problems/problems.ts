import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {BackendClient} from "../../backend/client.service";
import {HostSynthesisPage} from "../hostsynthesis/hostsynthesis";
import {ProblemsListPage} from "./problemslist/problemslist";


@IonicPage()
@Component({
  selector: 'page-problems',
  templateUrl: 'problems.html',
})
export class ProblemsPage {
  servicesProblems = [];
  hostsProblems = [];

  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.collectProblems()
  }

  collectProblems(): void {
    let problemServiceStates = ['CRITICAL', 'WARNING'];
    for (let problemService in problemServiceStates){
      this.client.getProblems('service', problemServiceStates[problemService])
        .subscribe(
          function(data) {
            this.servicesProblems = this.servicesProblems.filter(
              s => s['active_checks_enabled'] || s['passive_checks_enabled']
            ).concat(data['_items']);
          }.bind(this)
        );
    }

    let problemHostStates = ['DOWN'];
    for (let problemHost in problemHostStates){
      this.client.getProblems('host', problemHostStates[problemHost])
        .subscribe(
          function(data) {
            this.hostsProblems = this.hostsProblems.filter(
              h => h['active_checks_enabled'] || h['passive_checks_enabled']
            ).concat(data['_items']);
            console.log(this.hostsProblems);
            console.log(data);
          }.bind(this)
        );
    }
  }

  public displayProblems(state: string, itemType): void {
    // Push to ProblemsList Page
    this.navCtrl.push(ProblemsListPage, {state: state, itemType: itemType})
  }


}
