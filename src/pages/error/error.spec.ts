import { async, TestBed } from '@angular/core/testing';
import {IonicModule, NavParams} from 'ionic-angular';

import {ErrorPage} from "./error";


describe('ErrorPage: ', () => {
  let fixture;
  let errorPage;
  const data = {error: 'Raising Error'};
  const navParams = new NavParams(data);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPage],
      imports: [
        IonicModule.forRoot(ErrorPage),
      ],
      providers: [
        {provide: NavParams, useValue: navParams},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPage);
    errorPage = fixture.componentInstance;
  });

  it('Initialize ErrorPage', () => {
    expect(errorPage.error).toEqual('Raising Error')
  });
});
