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
  public totalProblems = {
    host: {
      DOWN: 0,
      UNREACHABLE: 0
    },
    service: {
      WARNING: 0,
      CRITICAL: 0,
      UNKNOWN: 0,
      UNREACHABLE: 0,
    }
  };

  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.setTotalProblems();
  }

  private setTotalProblems(): void {
    // TODO
    for (let itemType in this.totalProblems) {
      for (let state in this.totalProblems[itemType]) {
        this.client.getProblems(itemType, state)
          .subscribe(
            function (data) {
              this.totalProblems[itemType][state] = data['_meta']['total'];
            }.bind(this)
          )
      }
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
