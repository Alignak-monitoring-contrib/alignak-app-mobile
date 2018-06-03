import {async, TestBed} from '@angular/core/testing';
import {IonicModule, NavController} from 'ionic-angular';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {LoginPage} from "./login";


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

  it('Event Handler Call doLogin()', () => {
    spyOn(loginPage, 'doLogin');
    loginPage.eventHandler(8);
    expect(loginPage.doLogin).not.toHaveBeenCalled();

    loginPage.eventHandler(13);
    expect(loginPage.doLogin).toHaveBeenCalled();
  });

});
