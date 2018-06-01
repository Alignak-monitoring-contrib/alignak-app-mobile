import {async, TestBed} from '@angular/core/testing';
import { NavController} from 'ionic-angular';

import {HostsPage} from "./hosts";
import {BackendClient} from "../../backend/client.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


describe('HostsPage: ', () => {
  let fixture;
  let hostPage: HostsPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostsPage],
      imports: [HttpClientTestingModule],
      providers: [NavController, BackendClient, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostsPage);
    hostPage = fixture.componentInstance;
  });

  it('Initialize HostsPage',
    () => {
      expect(hostPage.hosts).toEqual([]);
      expect(hostPage.colors).toEqual({up: 'up', unreachable: 'unreachable', down: 'down' });
      expect(hostPage.nextPage).toEqual('host');
      expect(hostPage.criteria).toEqual('')
    });

  it('Host Page Criteria is Compared',
    () => {
      // '' != 'DOWN'
      let itemTest = {ls_state: 'DOWN', name: 'host_one', ls_downtimed: true};
      expect(hostPage.compare(itemTest)).toEqual(0);

      // 'UP' not in 'DOWN'
      hostPage.criteria = 'UP';
      expect(hostPage.compare(itemTest)).toEqual(1);

      // 'DO' in DOWN
      hostPage.criteria = 'DO';
      expect(hostPage.compare(itemTest)).toEqual(-1);

      // Field name: 'serv' not in 'host_one'
      hostPage.criteria = 'name:serv';
      expect(hostPage.compare(itemTest)).toEqual(1);

      // Field name: 'host' in 'host_one'
      hostPage.criteria = 'name:host';
      expect(hostPage.compare(itemTest)).toEqual(-1);

      // Field name: 'ls_downtimed' is 'true'
      hostPage.criteria = 'ls_downtimed:false';
      expect(hostPage.compare(itemTest)).toEqual(1);

      // Field name: 'ls_downtimed' is 'true'
      hostPage.criteria = 'ls_downtimed:true';
      expect(hostPage.compare(itemTest)).toEqual(-1);
    });
});
