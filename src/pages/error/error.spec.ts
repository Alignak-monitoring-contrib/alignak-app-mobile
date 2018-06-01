import { async, TestBed } from '@angular/core/testing';
import {IonicModule, NavController, NavParams} from 'ionic-angular';

import {ErrorPage} from "./error";


describe('WrongPage: ', () => {
  let fixture;
  let wrongLogin;
  const data = {error: 'Login Error'};
  const navParams = new NavParams(data);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPage],
      imports: [
        IonicModule.forRoot(ErrorPage),
      ],
      providers: [
        {provide: NavParams, useValue: navParams},
        {provide: NavController},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPage);
    wrongLogin = fixture.componentInstance;
  });

  it('Initialize ErrorPage', () => {
    expect(wrongLogin.error).toEqual('Login Error')
  });
});
