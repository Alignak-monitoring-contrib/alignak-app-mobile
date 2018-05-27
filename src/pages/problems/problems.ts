import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ProblemsListPage} from "./problemslist/problemslist";
import {BackendClient} from "../../backend/client.service";


@IonicPage()
@Component({
  selector: 'page-problems',
  templateUrl: 'problems.html',
})
/**
 * Class who manage menus for problem types
 */
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

  /**
   * @param {NavController} navCtrl - navigator controller
   * @param {BackendClient} client - backend client for requests
   */
  constructor(public navCtrl: NavController, public client: BackendClient) {
    this.setTotalProblems();
  }

  /**
   * Set total for problems
   */
  private setTotalProblems(): void {
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

  /**
   * Return if user have to do something or not
   * @param {number} nbProblems - number of problems
   * @returns {boolean} do something or not
   */
  public toDo(nbProblems: number): boolean {
    return (!!nbProblems);
  }

  /**
   * Push to {@link ProblemsListPage} with corresponding state and item type
   * @param {string} state - state of problem (DOWN, CRITICAL,...)
   * @param {string} itemType - type of item ("host" or "service")
   */
  public displayProblems(state: string, itemType: string): void {
    // Push to ProblemsList Page
    this.navCtrl.push(ProblemsListPage, {state: state, itemType: itemType})
  }
}
