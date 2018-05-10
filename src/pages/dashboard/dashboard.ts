import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BackendClient } from "../../backend/client.service";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [BackendClient]
})
export class Dashboard {
  private livesynthesis = {
    monitored: {host: 0, service: 0, total: 0},
    problems: {host: 0, service: 0, total: 0},
  };
  private icon_colors = {
    host: 'secondary',
    service: 'secondary',
    total: 'secondary',
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
    let livesynth = data['_items'][0];
    // Define totals
    this.livesynthesis.monitored.host = livesynth['hosts_total'];
    this.livesynthesis.monitored.service = livesynth['services_total'];
    this.livesynthesis.monitored.total = livesynth['hosts_total'] + livesynth['services_total'];

    // Define problems
    let hosts_problem_keys = ['hosts_down_hard', 'hosts_down_soft', 'hosts_unreachable_hard', 'hosts_unreachable_soft'];
    livesynth[hosts_problem_keys[2]] += 1;
    for (let hostKey in hosts_problem_keys) {
      if (!Object.prototype.hasOwnProperty.call(livesynth, hostKey)) {
        this.livesynthesis.problems.host += livesynth[hosts_problem_keys[hostKey]];
      }
    }

    let services_problem_keys = ['services_critical_hard', 'services_critical_soft','services_warning_hard',
      'services_warning_soft', 'services_unreachable_hard', 'services_unreachable_soft'];
    for (let serviceKey in services_problem_keys) {
      if (!Object.prototype.hasOwnProperty.call(livesynth, serviceKey)) {
        this.livesynthesis.problems.service += livesynth[services_problem_keys[serviceKey]];
      }
    }

    this.livesynthesis.problems.total = this.livesynthesis.problems.host + this.livesynthesis.problems.service;
    this.update_colors()
  }

  private update_colors(){
    if (this.livesynthesis.problems.host > 0) {
      this.icon_colors.host = 'danger'
    } else {
      this.icon_colors.host = 'secondary'
    }

    if (this.livesynthesis.problems.service > 0) {
      this.icon_colors.service = 'danger'
    } else {
      this.icon_colors.service = 'secondary'
    }

    if (this.livesynthesis.problems.total> 0) {
      this.icon_colors.total = 'danger'
    } else {
      this.icon_colors.total = 'secondary'
    }
  }

}
