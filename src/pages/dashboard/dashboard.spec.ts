import {async, TestBed} from '@angular/core/testing';
import { NavController} from 'ionic-angular';

import {DashboardPage} from "./dashboard";
import {BackendClient} from "../../backend/client.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {KeysPipe} from "../../common/pipes";
import {
  CRITICAL,
  OK,
  WARN,
  WARNING,
  UNREACHABLE,
  UNKNOWN,
  ACKNOWLEDGED,
  IN_DOWNTIME,
  FLAPPING
} from "../../common/utils";


describe('DashboardPage: ', () => {
  let fixture;
  let dashboardPage: DashboardPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPage, KeysPipe],
      imports: [HttpClientTestingModule],
      providers: [NavController, BackendClient, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    dashboardPage = fixture.componentInstance;
  });

  it('Initialize DashboardPage Page',
    () => {
      for(let hKey in dashboardPage.hostSynthesis)
        expect(dashboardPage.hostSynthesis[hKey]).toEqual(0)
      for(let sKey in dashboardPage.serviceSynthesis)
        expect(dashboardPage.serviceSynthesis[sKey]).toEqual(0)
      for(let cKey in dashboardPage.colors) {
        expect(dashboardPage.colors[cKey].outerStrokeColor).toEqual(OK);
        expect(dashboardPage.colors[cKey].innerStrokeColor).toEqual(OK);
      }
    });

  it('Update Percent And Colors', () => {
    dashboardPage.hostSynthesis['total'] = 4;
    dashboardPage.hostSynthesis['not_monitored'] = 1;
    dashboardPage.livestate.problems.host = 1;
    dashboardPage.serviceSynthesis['total'] = 5;
    dashboardPage.serviceSynthesis['not_monitored'] = 1;
    dashboardPage.livestate.problems.service = 1;
    dashboardPage.livestate.total = 9;
    dashboardPage.livestate.problems.total = 2;
    dashboardPage.updatePercentAndColors();
    expect(dashboardPage.livestate.percent.host).toEqual(33.4);
    expect(dashboardPage.livestate.percent.service).toEqual(25);
    expect(dashboardPage.livestate.percent.total).toEqual(28.6);
  });

  it('Set Main Dashboard Color', () => {
    // DashboardPage.setMainDashboardColor(this.livestate.percent.total, this.colors.total);
    expect(dashboardPage.colors.host.outerStrokeColor).toEqual(OK);
    expect(dashboardPage.colors.host.innerStrokeColor).toEqual(OK);

    // If percent equal to 0, colors are OK
    DashboardPage.setMainDashboardColor(0, dashboardPage.colors.host);
    expect(dashboardPage.colors.host.outerStrokeColor).toEqual(OK);
    expect(dashboardPage.colors.host.innerStrokeColor).toEqual(OK);

    // If percent equal to <= 50, colors are WARN and WARNING
    DashboardPage.setMainDashboardColor(30, dashboardPage.colors.host);
    expect(dashboardPage.colors.host.outerStrokeColor).toEqual(WARN);
    expect(dashboardPage.colors.host.innerStrokeColor).toEqual(WARNING);

    // If percent equal to > 50, colors are CRITICAL
    DashboardPage.setMainDashboardColor(60, dashboardPage.colors.host);
    expect(dashboardPage.colors.host.outerStrokeColor).toEqual(CRITICAL);
    expect(dashboardPage.colors.host.innerStrokeColor).toEqual(CRITICAL);
  });

  it('Get Percent', () => {
    // Get Percent with one decimal point
    let result = DashboardPage.getPercent(13, 56);
    expect(result).toEqual(23.3);

    // Infinity percent return 0
    result = DashboardPage.getPercent(25, 0);
    expect(result).toEqual(0);

    // Nan | null | undefined percent return 0
    result = DashboardPage.getPercent(0, 0);
    expect(result).toEqual(0);
  });

  it('Get Percent From Item Type', () => {
    // Return 50% for host item (4 / (10 - 2)) * 100
    dashboardPage.hostSynthesis['total'] = 10;
    dashboardPage.hostSynthesis['not_monitored'] = 2;
    let result = dashboardPage.getPercentFromItemType(4, 'host');
    expect(result).toEqual(50);

    // Return 20% for service item (4 / (24-4)) * 100
    dashboardPage.serviceSynthesis['total'] = 24;
    dashboardPage.serviceSynthesis['not_monitored'] = 4;
    result = dashboardPage.getPercentFromItemType(4, 'service');
    expect(result).toEqual(20);

    // Wrong item type return 0
    result = dashboardPage.getPercentFromItemType(4, 'noType');
    expect(result).toEqual(0);
  });

  it('Get Subtitle From Item', () => {
    // Return subtitle for hosts 'down'
    dashboardPage.hostSynthesis['down'] = 5;
    dashboardPage.hostSynthesis['total'] = 10;
    dashboardPage.hostSynthesis['not_monitored'] = 2;
    let result = dashboardPage.getSubtitleFromItem('down', 'host');
    expect(result).toEqual('5 / 8');

    // Return subtitle for services 'up'
    dashboardPage.serviceSynthesis['up'] = 7;
    dashboardPage.serviceSynthesis['total'] = 84;
    dashboardPage.serviceSynthesis['not_monitored'] = 8;
    result = dashboardPage.getSubtitleFromItem('up', 'service');
    expect(result).toEqual('7 / 76');

    // Wrong key return error message
    result = dashboardPage.getSubtitleFromItem('wrong', 'host');
    expect(result).toEqual('ERR: [wrong] not in [host] itemType');

    // Wrong itemType return error message
    result = dashboardPage.getSubtitleFromItem('up', 'wrong');
    expect(result).toEqual('ERR: [up] not in [wrong] itemType')
  });

  it('Get Color From Key', () => {
    // If total = 0, color is white
    expect(dashboardPage.getColorFromKey('up', 0)).toEqual('#f4f4f4');

    // If key is wrong, return black
    expect(dashboardPage.getColorFromKey('wrong', 7)).toEqual('#000000');

    // If keys are right and value > 0, return associated color
    expect(dashboardPage.getColorFromKey('up', 1)).toEqual(OK);
    expect(dashboardPage.getColorFromKey('warning', 1)).toEqual(WARN);
    expect(dashboardPage.getColorFromKey('down', 1)).toEqual(CRITICAL);
    expect(dashboardPage.getColorFromKey('unreachable', 1)).toEqual(UNREACHABLE);
    expect(dashboardPage.getColorFromKey('unknown', 1)).toEqual(UNKNOWN);
    expect(dashboardPage.getColorFromKey('acknowledged', 1)).toEqual(ACKNOWLEDGED);
    expect(dashboardPage.getColorFromKey('in_downtime', 1)).toEqual(IN_DOWNTIME);
    expect(dashboardPage.getColorFromKey('flapping', 1)).toEqual(FLAPPING);
  });

  it('Do Circle ?', () => {
    // key != 'not_monitored' && key != 'total';
    expect(dashboardPage.doCircle('critical')).toBe(true);

    expect(dashboardPage.doCircle('total')).toBe(false);
    expect(dashboardPage.doCircle('not_monitored')).toBe(false);
  });
});
