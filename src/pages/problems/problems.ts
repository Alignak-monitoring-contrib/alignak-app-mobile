import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ProblemsListPage} from "./problemslist/problemslist";


@IonicPage()
@Component({
  selector: 'page-problems',
  templateUrl: 'problems.html',
})
export class ProblemsPage {

  constructor(public navCtrl: NavController) {
  }

  public displayProblems(state: string, itemType): void {
    // Push to ProblemsList Page
    this.navCtrl.push(ProblemsListPage, {state: state, itemType: itemType})
  }


}
