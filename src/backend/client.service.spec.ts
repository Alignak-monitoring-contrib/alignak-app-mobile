import {async, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from "@angular/common/http";

import {BackendClient} from "./client.service";

describe('BackendClient Service', () => {
  let client: BackendClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BackendClient, HttpClient, HttpHandler],
    });

  }));

  beforeEach(() => {
    localStorage.setItem('url', '');
    localStorage.setItem('token', '');
    client = TestBed.get(BackendClient);
  });

  it('Init BackendClient', () => {
    expect(client.token).toEqual('');
    expect(client.url).toEqual('');
    expect(client.http instanceof HttpClient).toBe(true);
  });

});
