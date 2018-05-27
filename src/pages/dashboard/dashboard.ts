import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BackendClient } from "../../backend/client.service";
import {Utils, OK, WARN, WARNING, CRITICAL} from "../../common/utils";


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [BackendClient]
})
/**
 * Class who display dashboards
 */
export class Dashboard {
  private livestate = {
    total: 0,
    problems: {host: 0, service: 0, total: 0},
    percent: {host: 0.0, service: 0.0, total: 0.0}
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

  /**
   * @param {BackendClient} client - client to get backend data
   */
  constructor(public client: BackendClient) {
    this.client.getLivesynthesis().subscribe(
      function (data) {
          this.manageData(data);
          this.updatePercentAndColors();
        }.bind(this),
          err => console.log('Synth err', err)
    )
  }

  /**
   * Manage data from request
   * @param data - data received by backend: {_items:..., _meta:...}
   */
  protected manageData(data: Object): void {
    // Manage data from backend request
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

      // Define global total
      this.livestate.total += livesynth['hosts_total'] + livesynth['services_total'];

      // Define host problems
      let hosts_problem_keys = [
        'hosts_down_hard', 'hosts_down_soft', 'hosts_unreachable_hard', 'hosts_unreachable_soft'];
      for (let hostKey in hosts_problem_keys) {
        if (!Object.prototype.hasOwnProperty.call(livesynth, hostKey)) {
          this.livestate.problems.host += livesynth[hosts_problem_keys[hostKey]];
        }
      }

      // Define services problems
      let services_problem_keys = [
        'services_critical_hard', 'services_critical_soft', 'services_warning_hard',
        'services_warning_soft', 'services_unreachable_hard', 'services_unreachable_soft'];
      for (let serviceKey in services_problem_keys) {
        if (!Object.prototype.hasOwnProperty.call(livesynth, serviceKey)) {
          this.livestate.problems.service += livesynth[services_problem_keys[serviceKey]];
        }
      }

      // Define total problems
      this.livestate.problems.total = this.livestate.problems.host + this.livestate.problems.service;
    }

  }

  /**
   * Update percentages and colors for dashboards
   */
  protected updatePercentAndColors(): void {
    // Set percentages and colors
    let realHostsTotal = this.livestate.percent.host = this.hostSynthesis.total - this.hostSynthesis['not_monitored'];
    this.livestate.percent.host = Dashboard.getPercent(this.livestate.problems.host, realHostsTotal);

    let realServicesTotal = this.serviceSynthesis.total - this.serviceSynthesis['not_monitored'];
    this.livestate.percent.service = Dashboard.getPercent(this.livestate.problems.service, realServicesTotal);

    let realItemsTotal = this.livestate.total - (this.hostSynthesis['not_monitored'] + this.serviceSynthesis['not_monitored']);
    this.livestate.percent.total = Dashboard.getPercent(this.livestate.problems.total, realItemsTotal);

    Dashboard.setMainDashboardColor(this.livestate.percent.total, this.colors.total);
    Dashboard.setMainDashboardColor(this.livestate.percent.host, this.colors.host);
    Dashboard.setMainDashboardColor(this.livestate.percent.service, this.colors.service);
  }

  /**
   * Define color for main dashboard
   * @param percent - value of percentage
   * @param color - corresponding values of color
   */
  private static setMainDashboardColor(percent: number, color: Object): void {
    if (percent == 0) {
        color['outerStrokeColor'] = OK;
        color['innerStrokeColor'] = OK;
      } else if (percent <= 50) {
        color['outerStrokeColor'] = WARN;
        color['innerStrokeColor'] = WARNING;
      } else {
        color['outerStrokeColor'] = CRITICAL;
        color['innerStrokeColor'] = CRITICAL;
      }

  }

  /**
   * Return percentage for given value and total
   * @param value - number of items
   * @param total - total of items
   * @returns {number} percentage
   */
  private static getPercent(value: number, total: number): number {
    // Return percentage for value and total
    return +((value / total) * 100).toFixed(2) | 0
  }

  /**
   * Return percentage from item type for value
   * @param {number} value - number of item for item type
   * @param {string} itemType -
   * @returns {number}
   */
  public getPercentFromItemType(value: number, itemType: string): number {
    // Return percentage for given value and total
    let total = 0;
    if(!value)
      value = 0;

    if (itemType == 'host')
      total = this.hostSynthesis['total'] - this.hostSynthesis['not_monitored'];
    else if (itemType == 'service')
      total = this.serviceSynthesis['total'] - this.serviceSynthesis['not_monitored'];

    return Dashboard.getPercent(value, total);

  }

  /**
   * Return formatted subtitle for numbers of data corresponding to item key
   * @param {string} itemKey - item key of data
   * @param {string} itemType - item type host or service
   * @returns {string} formatted subtitle
   */
  public getSubtitleFromItem(itemKey: string, itemType: string): string {
    let data = {};
    if (itemType == 'host')
      data = this.hostSynthesis;
    else if (itemType == 'service')
      data = this.serviceSynthesis;

    return data[itemKey] + ' / ' + (data['total'] - data['not_monitored'])
  }

  /**
   * Return corresponding color for given key and value
   * @param {string} key - the key of synthesis
   * @param {number} value - value of associated key
   * @returns {string} color value
   */
  public getColorFromKey(key: string, value: number){
    return Utils.getColor(key, value)
  }

  /**
   * define if circle should be created or not for dashboard
   * @param {string} key - current key for dashboard
   * @returns {boolean} if circle should be created
   */
  public doCircle(key: string): boolean {
    return key != 'not_monitored' && key != 'total';
  }
}
