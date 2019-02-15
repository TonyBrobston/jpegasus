import exif from 'exif-js';
import Chance from 'chance';

import exifService from '../../src/services/exifService';

jest.mock('exif-js');

const chance = new Chance();

describe('exifService', () => {
    let image;


    let expectedOrientation;


    let actualOrientation;

    beforeAll(async () => {
        image = chance.string();
        expectedOrientation = chance.integer();
        exif.getTag.mockReturnValue(expectedOrientation);
        exif.getData.mockImplementation((_, cb) => {
            cb();
        });

        actualOrientation = await exifService.determineOrientation(image);
    });

    it('should have called exif getData', () => {
        expect(exif.getData).toHaveBeenCalledTimes(1);
        expect(exif.getData).toHaveBeenCalledWith(image, expect.any(Function));
    });

    it('should have called exif getTag', () => {
        expect(exif.getTag).toHaveBeenCalledTimes(1);
        expect(exif.getTag).toHaveBeenCalledWith(image, 'Orientation');
    });

    it('should have orientation of file', () => {
        expect(actualOrientation).toBe(expectedOrientation);
    });
});
