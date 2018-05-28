import { async, inject, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import {HttpClient, HttpHandler} from "@angular/common/http";

import {BackendClient} from "./client.service";
import {MyApp} from "../app/app.component";


describe('BackendClient Service', () => {

  let service: BackendClient;
  let httpHandler: HttpHandler;
  beforeEach(() => { service = new BackendClient(new HttpClient(httpHandler)); });

  it('Init BackendClient', () => {
    expect(service instanceof BackendClient).toBe(true);
  });

});
