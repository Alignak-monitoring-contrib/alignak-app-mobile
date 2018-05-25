import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {BackendClient} from "../../../backend/client.service";


@IonicPage()
@Component({
  templateUrl: 'problemslist.html',
})
export class ProblemsListPage {
  private state: string;
  private itemType: string;
  private problems = [];
  private nextPage = undefined;

  constructor(public navParams: NavParams, public client: BackendClient) {
    this.state = this.navParams.get('state');
    this.itemType = this.navParams.get('itemType');
    this.addProblems();
    console.log(this.state)
  }

  private addProblems(){
    this.client.getProblems(this.itemType, this.state)
      .subscribe(
        function(data) {
          this.problems = this.problems.filter(
            h => h['active_checks_enabled'] || h['passive_checks_enabled']
          ).concat(data['_items']);
          console.log(data);
          if(data['_links']['next'])
            this.nextPage = data['_links']['next']['href']
          console.log(this.problems)
        }.bind(this)
      );
  }
}
