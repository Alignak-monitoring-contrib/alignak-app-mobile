import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BackendClient } from "../../backend/client.service";


const OK   = '#27ae60';
const UNREACHABLE= '#9b59b6';
const WARN = '#e67e22';
const CRITICAL = '#e74c3c';
const UNKNOWN = '#2a80b9';
const ACKNOWLEDGED = '#f39c12';
const IN_DOWNTIME = '#f1c40f';
const FLAPPING = '#f1b3f0';
const NOT_MONITORED = '#cccccc';
const TOTAL = '#1fb4e4';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [BackendClient]
})
export class Dashboard {
  private livestate = {
    total: 0,
    problems: {host: 0, service: 0, total: 0},
    percent: {host: '0.0', service: '0.0', total: '0.0'}
  };
  private colors = {
    host: {outerStrokeColor: OK, innerStrokeColor: OK},
    service: {outerStrokeColor: OK, innerStrokeColor: OK},
    total: {outerStrokeColor: OK, innerStrokeColor: OK},
  };
  private hostSynthesis = {
      up: 0,
      unreachable: 0,
      down: 0,
      flapping: 0,
      acknowledged: 0,
      in_downtime: 0,
      not_monitored: 0,
      total: 0,
    };
  private serviceSynthesis = {
      ok: 0,
      unreachable: 0,
      warning: 0,
      critical: 0,
      unknown: 0,
      flapping: 0,
      acknowledged: 0,
      in_downtime: 0,
      not_monitored: 0,
      total: 0,
    };
  hostKeys = Object.keys(this.hostSynthesis);
  serviceKeys = Object.keys(this.serviceSynthesis);

  constructor(public client: BackendClient) {
    this.client.getLivesynthesis().subscribe(
      function (data) {
          this.manageData(data);
        }.bind(this),
          err => console.log('Synth err', err)
    )
  }

  protected manageData(data: {}){
    for (let i = 0; i < data['_items'].length; i++) {
      // Current synthesis data
      let livesynth = data['_items'][i];

      // Update global synthesis
      this.hostSynthesis.up += livesynth['hosts_up_soft'] + livesynth['hosts_up_hard'];
      this.hostSynthesis.unreachable += livesynth['hosts_unreachable_soft'] + livesynth['hosts_unreachable_hard'];
      this.hostSynthesis.down += livesynth['hosts_down_soft'] + livesynth['hosts_down_hard'];
      this.hostSynthesis.acknowledged += livesynth['hosts_acknowledged'];
      this.hostSynthesis.in_downtime += livesynth['hosts_in_downtime'];
      this.hostSynthesis.flapping += livesynth['hosts_flapping'];
      this.hostSynthesis.not_monitored += livesynth['hosts_not_monitored'];
      this.hostSynthesis.total += livesynth['hosts_total'];

      this.serviceSynthesis.ok += livesynth['services_ok_soft'] + livesynth['services_ok_hard'];
      this.serviceSynthesis.unreachable += livesynth['services_unreachable_soft'] + livesynth['services_unreachable_hard'];
      this.serviceSynthesis.unknown += livesynth['services_unknown_soft'] + livesynth['services_unknown_hard'];
      this.serviceSynthesis.warning += livesynth['services_warning_soft'] + livesynth['services_warning_hard'];
      this.serviceSynthesis.critical += livesynth['services_critical_soft'] + livesynth['services_critical_hard'];
      this.serviceSynthesis.acknowledged += livesynth['services_acknowledged'];
      this.serviceSynthesis.in_downtime += livesynth['services_in_downtime'];
      this.serviceSynthesis.flapping += livesynth['services_flapping'];
      this.serviceSynthesis.not_monitored += livesynth['services_not_monitored'];
      this.serviceSynthesis.total += livesynth['services_total'];

      // Update global total
      this.livestate.total += livesynth['hosts_total'] + livesynth['services_total'];

      // Update global problems
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
      (100 - (this.livestate.problems.host / this.hostSynthesis.total) * 100).toFixed(2);
    this.livestate.percent.service =
      (100 - (this.livestate.problems.service / this.serviceSynthesis.total) * 100).toFixed(2);
    this.livestate.percent.total = this.getPercent(this.livestate.problems.total, this.livestate.total);

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

  public getPercent(value, total): string {
    // Return percentage for given value and total

    return ((value / total | 0) * 100).toFixed(2);

  }

  public getColorFromKey(key: string, value: 0): string {
    let color = '#000000';
    if (value == 0)
      return '#f4f4f4';

    if (key == 'ok' || key == 'up')
      color = OK;
    else if (key == 'warning')
      color = WARN;
    else if (key == 'down' || key == 'critical')
      color = CRITICAL;
    else if (key == 'unreachable')
      color = UNREACHABLE;
    else if (key == 'unknown')
      color = UNKNOWN;
    else if (key == 'acknowledged')
      color = ACKNOWLEDGED;
    else if (key == 'in_downtime')
      color = IN_DOWNTIME;
    else if (key == 'flapping')
      color = FLAPPING;
    else if (key == 'not_monitored')
      color = NOT_MONITORED;
    else if (key == 'total')
      color = TOTAL;

    return color
  }
}
