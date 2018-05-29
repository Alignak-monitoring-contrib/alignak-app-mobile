import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClient} from "@angular/common/http";
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

  // This test fails and expect is not take in account
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
  })
});
