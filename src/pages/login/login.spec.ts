import {async, TestBed} from '@angular/core/testing';
import {IonicModule, NavController} from 'ionic-angular';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LoginPage} from "./login";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


describe('LoginPage: ', () => {
  let fixture;
  let loginPage: LoginPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(LoginPage), HttpClientTestingModule],
      providers: [ NavController, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    localStorage.setItem('url', 'http://demo.alignak.net:5000');
    localStorage.setItem('username', 'admin');
    fixture = TestBed.createComponent(LoginPage);
    loginPage = fixture.componentInstance;
  });

  it('Initialize Login Page', () => {
    expect(loginPage.backend_url).toBe('http://demo.alignak.net:5000');
    expect(loginPage.username).toBe('admin');
  });

});
