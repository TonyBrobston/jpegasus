import exif from 'exif-js';
import Chance from 'chance';

import exchangeableImageFormatService from '../../../src/services/formats/exchangeableImageFormatService';

jest.mock('exif-js');

const chance = new Chance();

describe('exchangeableImageFormatService', () => {
    const file = new File([], '');
    let expectedOrientation,
        image,
        actualOrientation;

    beforeAll(async () => {
        image = {
            addEventListener: jest.fn((_, evtHandler) => { evtHandler(); })
        };
        window.Image = jest.fn(() => image);
        expectedOrientation = chance.integer();
        exif.getTag.mockReturnValue(expectedOrientation);
        exif.getData.mockImplementation((_, cb) => {
            cb();
        });
        global.URL.createObjectURL = jest.fn();
        global.URL.createObjectURL.mockReturnValue(chance.url());

        actualOrientation = await exchangeableImageFormatService.determineOrientation(file);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should create an image', () => {
        expect(window.Image).toHaveBeenCalledTimes(1);
        expect(window.Image).toHaveBeenCalledWith();
    });

    it('should fire onload on load of file', () => {
        expect(image.addEventListener).toHaveBeenCalledTimes(1);
        expect(image.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
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