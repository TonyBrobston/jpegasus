import Chance from 'chance';

import windowService from '../../../src/services/elements/windowService';

const chance = new Chance();

describe('windowService', () => {
    const base64 = chance.integer({min: 0, max});
    const blobType = chance.string();
    const byteCharacters = chance.string();
    //todo: this should probably be:
    //const byteCharacaters = chance.integer({min: 0, max: chance.randomNumber() * 1024;
    let blob;

    // window.atob = jest.fn();

    beforeAll(() => {
        // window.atob.mockReturnValue(byteCharacters);

        blob = windowService.toBlob(base64, blobType);
    });

    it('should convert base64 to blob', () => {
        // expect(window.atob).toHaveBeenCalledTimes(1);
        // expect(window.atob).toHaveBeenCalledWith(base64);


        console.log('blob:', blob);
        console.log('blob size:', blob.size);
        console.log('blob type:', blob.type);
    });
});