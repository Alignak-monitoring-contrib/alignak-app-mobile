import {KeysPipe} from "./pipes";

describe('KeysPipe: ', () => {
  let keysPipe: KeysPipe;

  beforeEach(() => {
    keysPipe = new KeysPipe();
  });

  it('All keys of Objetc are returned', () => {
    let testObject = {keyOne: 'Key is one', keyTwo: 'Key is two', keyThree: 'Key is three'};

    expect(keysPipe.transform(testObject, [])).toEqual( ['keyOne', 'keyTwo', 'keyThree']);
  });

});
