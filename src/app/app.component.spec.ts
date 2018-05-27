import { async, inject, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { HttpTestingController } from '@angular/common/http/testing';
import { PlatformMock, StatusBarMock, SplashScreenMock, LoginPageMock} from '../../test-config/mocks-ionic';
import {HttpClient} from "@angular/common/http";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import {BackendClient} from "../backend/client.service";
import {LoginPage} from "../pages/login/login";


describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, LoginPage],
      imports: [
        IonicModule.forRoot(MyApp),
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: BackendClient },
        { provide: HttpClient},
        { provide: HttpTestingController},
        { provide: LoginPage, useClass: LoginPageMock},
      ],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it('Initialize MyApp', async(inject([HttpTestingController],
    (httpClient: HttpTestingController) => {
    expect(component instanceof MyApp).toBe(true);
  })));

  it('RootPage is equal to LoginPage', () => {
    expect(component.rootPage).toBe('LoginPage');
  });

  it('Log Out reset token', () => {
    component.logOut();
    expect(component.backend.token).toEqual('');
  });


});
