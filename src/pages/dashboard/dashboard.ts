import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BackendClient } from "../../backend/client.service";


const OK   = '#27ae60';
const WARN = '#e67e22';
const CRITICAL = '#e74c3c';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [BackendClient]
})
export class Dashboard {
  private livestate = {
    monitored: {host: 0, service: 0, total: 0},
    problems: {host: 0, service: 0, total: 0},
    percent: {host: '0.0', service: '0.0', total: '0.0'}
  };
  private colors = {
    host: {outerStrokeColor: OK, innerStrokeColor: OK},
    service: {outerStrokeColor: OK, innerStrokeColor: OK},
    total: {outerStrokeColor: OK, innerStrokeColor: OK},
  };

  constructor(public client: BackendClient) {
    this.client.get_livesynthesis().subscribe(
      function (data) {
          this.manageData(data);
        }.bind(this),
          err => console.log('Synth err', err)
    )
  }

  protected manageData(data: {}){
    for (let i = 0; i < data['_items'].length; i++) {
      // Current synth
      let livesynth = data['_items'][i];

      // Define totals
      this.livestate.monitored.host += livesynth['hosts_total'];
      this.livestate.monitored.service += livesynth['services_total'];
      this.livestate.monitored.total += livesynth['hosts_total'] + livesynth['services_total'];

      // Define problems
      let hosts_problem_keys = [
        'hosts_down_hard', 'hosts_down_soft', 'hosts_unreachable_hard', 'hosts_unreachable_soft'];
      for (let hostKey in hosts_problem_keys) {
        if (!Object.prototype.hasOwnProperty.call(livesynth, hostKey)) {
          this.livestate.problems.host += livesynth[hosts_problem_keys[hostKey]];
        }
      }

      let services_problem_keys = [
        'services_critical_hard', 'services_critical_soft', 'services_warning_hard',
        'services_warning_soft', 'services_unreachable_hard', 'services_unreachable_soft'];
      for (let serviceKey in services_problem_keys) {
        if (!Object.prototype.hasOwnProperty.call(livesynth, serviceKey)) {
          this.livestate.problems.service += livesynth[services_problem_keys[serviceKey]];
        }
      }
      this.livestate.problems.total = this.livestate.problems.host + this.livestate.problems.service;
    }

    // Update display
    this.updateDashboard();
  }

  private updateDashboard() {
    this.livestate.percent.host =
      (100 - (this.livestate.problems.host / this.livestate.monitored.host) * 100).toFixed(2);
    this.livestate.percent.service =
      (100 - (this.livestate.problems.service / this.livestate.monitored.service) * 100).toFixed(2);
    this.livestate.percent.total =
      ((this.livestate.problems.total / this.livestate.monitored.total) * 100).toFixed(2);

    this.updateColors()
  }

  private updateColors() {
    // Total colors
    if(+this.livestate.percent.total != 0) {
      this.colors.total.outerStrokeColor = CRITICAL
    } else {
      this.colors.total.outerStrokeColor = OK
    }

    if (+this.livestate.percent.total == 0) {
      this.colors.total.innerStrokeColor = OK
    } else if (+this.livestate.percent.total < 50) {
      this.colors.total.innerStrokeColor = WARN
    } else {
      this.colors.total.innerStrokeColor = CRITICAL
    }

    // Host / Service colors
    function defineColor(percent, color){
      if (percent == 100) {
        color.outerStrokeColor = OK
      } else {
        color.outerStrokeColor = CRITICAL
      }
      if (percent == 100) {
        color.innerStrokeColor = OK
      } else if (percent >= 50) {
        color.innerStrokeColor = WARN
      } else {
        color.innerStrokeColor = CRITICAL
      }
    }

    defineColor(+this.livestate.percent.host, this.colors.host);
    defineColor(+this.livestate.percent.service, this.colors.service);
  }

}
