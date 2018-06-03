import {async, getTestBed, TestBed} from '@angular/core/testing';
import {IonicModule, NavController} from 'ionic-angular';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {ProblemsPage} from "./problems";
import {BackendClient} from "../../backend/client.service";
import {ProblemsListPage} from "./problemslist/problemslist";


class NavCtrlMock {
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
}

describe('ProblemsPage: ', () => {
  let fixture;
  let injector;
  let navCtrl;
  let problemsPage: ProblemsPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemsPage],
      imports: [IonicModule.forRoot(ProblemsPage), HttpClientTestingModule],
      providers: [HttpClientTestingModule, BackendClient, {provide: NavController, useClass: NavCtrlMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsPage);
    problemsPage = fixture.componentInstance;
    injector = getTestBed();
    navCtrl = injector.get(NavController);
  });

  it('To Do or not To Do', () => {
    expect(problemsPage.toDo(0)).toBe(false);
    expect(problemsPage.toDo(12)).toBe(true);
  });

  it('Display Problems List Call NavCtrl push()', () => {
    spyOn(navCtrl, 'push');

    problemsPage.displayProblems('DOWN', 'host');
    expect(navCtrl.push).toHaveBeenCalledWith(ProblemsListPage, { state: 'DOWN', itemType: 'host' });
  });
});
