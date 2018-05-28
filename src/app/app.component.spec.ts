import { async, TestBed } from '@angular/core/testing';
import {IonicModule} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import {BackendClient} from "../backend/client.service";
import {LoginPage} from "../pages/login/login";


describe('TEST MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp),
      ],
      providers: [
        {provide: BackendClient},
        {provide: HttpClient},
        {provide: StatusBar},
        {provide: SplashScreen}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    spyOn(component.nav, 'setRoot');
  });

  it('Initialize MyApp',
    () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it('RootPage is equal to LoginPage', () => {
    expect(component.rootPage).toBe('LoginPage');
  });

  it('Log Out reset token',() => {
    component.logOut();
    expect(component.backend.token).toEqual('');
    expect(component.nav.setRoot).toHaveBeenCalledWith('LoginPage');
  });

  it('openPage open right page', () => {
    component.openPage('Dashboard');
    expect(component.nav.setRoot).toHaveBeenCalledWith('Dashboard');
  });

});
