import {TestBed, getTestBed} from '@angular/core/testing';

import {Utils} from "./utils";

describe('Utils: ', () => {

  it('getDate() return Not Yet Checked if LastCheck equal to 0', () => {
    const dummyItem = {ls_last_check: 0};
    let date = Utils.getDate(dummyItem);

    expect(date).toEqual('Not yet checked')
  });

  it('getDate() return formatted date if LastCheck != 0', () => {
    const dummyItem = {ls_last_check: 123456789};
    let date = Utils.getDate(dummyItem);

    expect(date != 'Not yet checked').toBe(true)
  });

  it('getItemName() Return Formatted Item Name', () => {
    const dummyItemNoAlias = {alias: '', name: 'host_name'};
    let itemName = Utils.getItemName(dummyItemNoAlias);

    expect(itemName).toEqual('Host name');

    const dummyItemWithAlias = {alias: 'My Host Name', name: 'host_name'};
    itemName = Utils.getItemName(dummyItemWithAlias);

    expect(itemName).toEqual('My Host Name');
  });

  it('getColor() Return Color from Key and Value', () => {
    let color = Utils.getColor('warning', 0);
    expect(color).toEqual('#f4f4f4');

    color = Utils.getColor('critical', 12);
    expect(color).toEqual('#e74c3c')

  });
});
