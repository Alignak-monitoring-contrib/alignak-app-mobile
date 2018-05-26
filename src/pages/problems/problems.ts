import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ProblemsListPage} from "./problemslist/problemslist";
import {BackendClient} from "../../backend/client.service";


@IonicPage()
@Component({
  selector: 'page-problems',
  templateUrl: 'problems.html',
})
export class ProblemsPage {
  public hostsDown = 0;
  public hostsUnreachable = 0;
  public servicesWarning= 0;
  public servicesCritical = 0;
  public servicesUnreachable = 0;
  public servicesUnknown = 0;

  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.setTotalProblems();
  }

  private setTotalProblems(): void {
    // TODO
    let hostStates = ['DOWN', 'UNREACHABLE'];
    for (let hostState in hostStates) {
      this.client.getProblems('host', hostStates[hostState])
        .subscribe(
          function (data) {
            if ('DOWN' == hostStates[hostState])
              this.hostsDown = data['_meta']['total'];
            if ('UNREACHABLE' == hostStates[hostState])
              this.hostsUnreachable= data['_meta']['total'];
          }.bind(this)
        )
    }

    let serviceStates = ['WARNING', 'CRITICAL', 'UNREACHABLE', 'UNKNOWN'];
    for (let serviceState in serviceStates) {
      this.client.getProblems('service', serviceStates[serviceState])
        .subscribe(
          function (data) {
            if ('WARNING' == serviceStates[serviceState])
              this.servicesWarning = data['_meta']['total'];
            if ('CRITICAL' == serviceStates[serviceState])
              this.servicesCritical = data['_meta']['total'];
            if ('UNREACHABLE' == serviceStates[serviceState])
              this.servicesUnreachable = data['_meta']['total'];
            if ('UNKNOWN' == serviceStates[serviceState])
              this.servicesUnknown = data['_meta']['total'];
          }.bind(this)
        )
    }
  }

  public toDo(nbProblems: number): boolean {
    // TODO
    return (!!nbProblems);
  }

  public displayProblems(state: string, itemType): void {
    // Push to ProblemsList Page
    this.navCtrl.push(ProblemsListPage, {state: state, itemType: itemType})
  }
}
