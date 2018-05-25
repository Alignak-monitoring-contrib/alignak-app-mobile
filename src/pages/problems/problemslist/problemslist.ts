import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavParams} from 'ionic-angular';
import {BackendClient} from "../../../backend/client.service";


@IonicPage()
@Component({
  templateUrl: 'problemslist.html',
})
export class ProblemsListPage {
  private readonly state: string;
  private readonly nextPage = undefined;
  public itemType: string;
  public problems = [];

  constructor(public navParams: NavParams, public client: BackendClient) {
    this.state = this.navParams.get('state');
    this.itemType = this.navParams.get('itemType');
    this.nextPage = this.navParams.get('itemType');
    this.addProblems();
  }

  private addProblems(): void {
    // Add problems for current state
    this.client.getProblems(this.nextPage, this.state)
      .subscribe(
        function(data) {
          this.problems = this.problems.concat(data['_items'].filter(
            h => h['active_checks_enabled'] || h['passive_checks_enabled']
          ));
          if (data['_links']['next'] != undefined) {
            this.nextPage = data['_links']['next']['href'];
          }
          else
            this.nextPage = undefined;
          console.log(data)
        }.bind(this)
      );
  }

  public doInfinite(infiniteScroll: InfiniteScroll): void {
    // Add problems when trigger infiniteScroll event

    setTimeout(() => {
      if (this.nextPage) {
        this.addProblems();
      }
      infiniteScroll.complete();
    }, 500);
  }
}
