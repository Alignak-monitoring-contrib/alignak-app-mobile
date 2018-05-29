import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {BackendClient} from "./client.service";

describe('BackendClient Service', () => {

  let injector: TestBed;
  let service: BackendClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendClient]
    });
    injector = getTestBed();
    localStorage.setItem('token', 'my-long-token');
    localStorage.setItem('url', 'http://demo.alignak.net:5000');
    service = injector.get(BackendClient);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Init Fill Token and URL properties', () => {
    expect(service.token).toEqual('my-long-token');
    expect(service.url).toEqual('http://demo.alignak.net:5000');
  });

  it('Login to Backend', () => {
    const dummyToken = [
      { token: 'my-received-token' }
    ];

    service.login('admin', 'admin').subscribe(
      token => {
      expect(token.length).toBe(1);
      expect(token).toEqual(dummyToken);
    });

    const req = httpMock.expectOne(`${service.url}/login`);
    expect(req.request.method).toBe("POST");
    expect(req.request.url).toBe(`${service.url}/login`);
    expect(req.request.body).toEqual({username: 'admin', password: 'admin'});
    req.flush(dummyToken);
  });

  it('Get Livesynthesis from Backend', () => {
    const dummySynthesis = [
      {_items: 'live synth'}
    ];
    const dummyHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'my-long-token');

    service.getLivesynthesis().subscribe(
      livesynth => {
        expect(livesynth.length).toBe(1);
      });

    const req = httpMock.expectOne(`${service.url}/livesynthesis`);
    expect(req.request.method).toBe("GET");
    expect(req.request.url).toBe(`${service.url}/livesynthesis`);
    expect(req.request.headers).toEqual(dummyHeaders);
    req.flush(dummySynthesis);
  });

  it('Get Hosts from Backend', () => {
    const dummyHosts = [
      {_items: 'Hosts Items'}
    ];
    const dummyParams = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false}))
      .set('max_results', JSON.stringify(25));

    service.getHosts().subscribe(
      hosts => {
        expect(hosts.length).toBe(1);
      });

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${service.url}/host`);
    expect(req.request.params.get('where')).toEqual(dummyParams.get('where'));
    expect(req.request.params.get('max_results')).toEqual(dummyParams.get('max_results'));
    req.flush(dummyHosts);
  });

  it('Get Host Services', () => {
    const dummyHostServices = [{
      _items: 'Host Services Items'
    }];
    const dummyHost = {
      _id: 'host-id'
    };
    const dummyParams = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false, 'host': dummyHost['_id']}))
      .set('max_results', JSON.stringify(25));

    service.getHostServices('service', dummyHost).subscribe(
      hostservices => {
        expect(hostservices.length).toBe(1);
      },
    );

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${service.url}/service`);
    expect(req.request.url).toEqual(`${service.url}/service`);
    expect(req.request.params.get('where')).toEqual(dummyParams.get('where'));
    expect(req.request.params.get('max_results')).toEqual(dummyParams.get('max_results'));
    req.flush(dummyHostServices);
  });

  it('Get Items in Problem', () => {
    const dummyProblems = [{
      _items: 'WARNING Problems'
    }];
    const dummyParams = new HttpParams()
      .set('where', JSON.stringify({
        '_is_template': false,
        'ls_state': 'WARNING',
        'ls_acknowledged': false,
        'ls_downtimed': false
      }));

    service.getProblems('service', 'WARNING').subscribe(
      problems => {
        expect(problems.length).toBe(1)
      }
    );

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${service.url}/service`);
    expect(req.request.url).toEqual(`${service.url}/service`);
    expect(req.request.params.get('where')).toEqual(dummyParams.get('where'));
    req.flush(dummyProblems);
  })
});
