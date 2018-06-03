import {async, getTestBed, TestBed} from '@angular/core/testing';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {ProblemsListPage} from "./problemslist";
import {BackendClient} from "../../../backend/client.service";
import {HostPage, ServicePage} from "../../item/item";


class MockNavCtrl {
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
}

class MockNavParams{
  data = {
    itemType: 'host',
    state: 'DOWN'
  };

  get(param){
    return this.data[param];
  }
}

describe('ProblemsPage: ', () => {
  let fixture;
  let injector;
  let navCtrl;
  let problemsListPage: ProblemsListPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemsListPage],
      imports: [IonicModule.forRoot(ProblemsListPage), HttpClientTestingModule],
      providers: [HttpClientTestingModule, BackendClient,
        {provide: NavController, useClass: MockNavCtrl},
        {provide: NavParams, useClass: MockNavParams}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsListPage);
    problemsListPage = fixture.componentInstance;
    injector = getTestBed();
    navCtrl = injector.get(NavController);
  });

  it('Initialize Problems List Page', () => {
    expect(problemsListPage.state).toEqual('DOWN');
    expect(problemsListPage.nextPage).toEqual('host');
    expect(problemsListPage.itemType).toEqual('host');
  });

  it('Get Item Name', () => {
    expect(problemsListPage.getItemName({name: 'my_host'})).toEqual('My host');
  });

  it('Get Icon Name', () => {
    // Data received is for host
    expect(problemsListPage.getIconName()).toEqual('list-box');

    // If service, "cube" is received
    problemsListPage.itemType = 'service';
    expect(problemsListPage.getIconName()).toEqual('cube')
  });

  it('Open Page for Wanted Item', () => {
    spyOn(navCtrl, 'push');

    problemsListPage.openPage('host', {name: 'an_host'});
    expect(navCtrl.push).toHaveBeenCalledWith(HostPage, {item: {name: 'an_host'}});

    problemsListPage.openPage('service', {name: 'a_service'});
    expect(navCtrl.push).toHaveBeenCalledWith(ServicePage, {item: {name: 'a_service'}});
  })
});
