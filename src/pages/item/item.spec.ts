import {async, getTestBed, TestBed} from '@angular/core/testing';
import { NavController, NavParams} from 'ionic-angular';

import {HostPage} from './item'
import {KeysPipe} from "../../common/pipes";
import {BackendClient} from "../../backend/client.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


class MockNavParams{
  item = {
    ls_state: 'DOWN',
    customs: [{CUST: 'OMS'}]
  };

  get(){
    return this.item;
  }
}

describe('HostPage: ', () => {
  let fixture;
  let injector;
  let navParams;
  let hostPage: HostPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostPage, KeysPipe],
      imports: [HttpClientTestingModule],
      providers: [NavController, BackendClient, HttpClientTestingModule,
        {provide: NavParams, useClass: MockNavParams},
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPage);
    hostPage = fixture.componentInstance;
    injector = getTestBed();
    navParams = injector.get(NavParams);
  });

  it('Initialize HostPage get Parameters',
    () => {
      expect(hostPage['shownGroup']).toBe(null);
      expect(hostPage.item['ls_state']).toEqual( 'DOWN')
    });

  it('Item Is an Host',
    () => {
      // Item have no property host
      expect(hostPage.itemIsHost()).toBe(true)
    });

  it('Item Have Customs',
    () => {
      expect(hostPage.haveCustoms()).toBe(true)
    });

  it('Show/Hide Customs Group',
    () => {
      let testObject = {};
      expect(hostPage['shownGroup']).toBe(null);

      // Expand group
      hostPage.toggleGroup(testObject);
      expect(hostPage['shownGroup']).toEqual(testObject);
      expect(hostPage.isGroupShown(testObject)).toBe(true);

      // Hide group
      hostPage.toggleGroup(testObject);
      expect(hostPage['shownGroup']).toBe(null);
      expect(hostPage.isGroupShown(testObject)).toBe(false);
    });

});
