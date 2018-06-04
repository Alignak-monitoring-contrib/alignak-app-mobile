import {async, getTestBed, TestBed} from '@angular/core/testing';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {ServicesPage} from "./services";
import {BackendClient} from "../../backend/client.service";
import {ServicePage} from "../item/item";


class MockNavCtrl {
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
}

class MockNavParams{
  data = {
    host: {name: 'my_host'}
  };

  get(param){
    return this.data[param];
  }
}

describe('ServicesPage: ', () => {
  let fixture;
  let injector;
  let navCtrl;
  let servicesPage: ServicesPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesPage],
      imports: [IonicModule.forRoot(ServicesPage), HttpClientTestingModule],
      providers: [HttpClientTestingModule, BackendClient,
        {provide: NavController, useClass: MockNavCtrl},
        {provide: NavParams, useClass: MockNavParams}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesPage);
    servicesPage = fixture.componentInstance;
    injector = getTestBed();
    navCtrl = injector.get(NavController);
  });

  it('Initialize Problems List Page Receive Params', () => {
    expect(servicesPage.host).toEqual({name: 'my_host'})
  });

  it('Services Page Criteria is Compared',
    () => {
      // '' != 'CRITICAL'
      let itemTest = {ls_state: 'CRITICAL', name: 'service_one', ls_downtimed: true};
      expect(servicesPage.compare(itemTest)).toEqual(0);

      // 'OK' not in 'CRITICAL'
      servicesPage.criteria = 'OK';
      expect(servicesPage.compare(itemTest)).toEqual(1);

      // 'CRITI' in 'CRITICAL'
      servicesPage.criteria = 'CRITI';
      expect(servicesPage.compare(itemTest)).toEqual(-1);

      // Field name: 'host' not in 'service_one'
      servicesPage.criteria = 'name:host';
      expect(servicesPage.compare(itemTest)).toEqual(1);

      // Field name: 'serv' in 'service_one'
      servicesPage.criteria = 'name:serv';
      expect(servicesPage.compare(itemTest)).toEqual(-1);

      // Field name: 'ls_downtimed' is 'true'
      servicesPage.criteria = 'ls_downtimed:false';
      expect(servicesPage.compare(itemTest)).toEqual(1);

      // Field name: 'ls_downtimed' is 'true'
      servicesPage.criteria = 'ls_downtimed:true';
      expect(servicesPage.compare(itemTest)).toEqual(-1);

      // Field does not exists
      servicesPage.criteria = 'wrong:field';
      expect(servicesPage.compare(itemTest)).toEqual(0);
    });

  it('Event Handler Call "compare()"', () => {
    spyOn(servicesPage, 'compare');
    servicesPage.services = [{ls_state: 'service_one'}, {ls_state: 'service_two'}, {ls_state: 'service_three'}];
    servicesPage.eventHandler();

    expect(servicesPage.compare).toHaveBeenCalled();
  });

  it('Get Item Name', () => {
    let itemTest = {name: 'my_service', alias: 'My Great Service'};
    expect(servicesPage.getItemName(itemTest)).toEqual('My Great Service');
  });

  it('Display Service Call NavCtrl "push()"', () => {
    spyOn(navCtrl, 'push');
    servicesPage.displayService({name: 'service_one'});

    expect(navCtrl.push).toHaveBeenCalledWith(ServicePage, {item: {name: 'service_one'}});
  });
});
