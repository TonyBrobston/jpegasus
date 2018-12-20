import Chance from 'chance';
import base64toblob from 'base64toblob';

import qualityService from '../../../src/services/sizing/qualityService';
import fileService from '../../../src/services/elements/fileService';

jest.mock('base64toblob');
jest.mock('../../../src/services/elements/fileService');

const chance = new Chance();

describe('qualityService', () => {
    const quality = chance.string();
    const filename = chance.string();
    const canvas = {
        toDataURL: jest.fn(),
    };
    const base64Prefix = chance.string();
    const base64Suffix = chance.string();
    const base64 = `${base64Prefix},${base64Suffix}`;
    const blob = chance.string();
    const expectedFile = chance.string();
    let actualFile;

    canvas.toDataURL.mockReturnValue(base64);
    base64toblob.mockReturnValue(blob);
    fileService.create.mockReturnValue(expectedFile);

    beforeAll(() => {
        actualFile = qualityService.toFile(canvas, quality, filename);
    });

    it('should convert canvasService to data url', () => {
        expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
        expect(canvas.toDataURL).toHaveBeenCalledWith('image/jpeg', quality);
    });

    it('should convert imageCanvas base64 to blob', () => {
        expect(base64toblob).toHaveBeenCalledTimes(1);
        expect(base64toblob).toHaveBeenCalledWith(base64Suffix, 'image/jpeg');
    });

    it('should create a new file', () => {
        expect(fileService.create).toHaveBeenCalledTimes(1);
        expect(fileService.create).toHaveBeenCalledWith(blob, filename);
    });

    it('should return a compressed file', () => {
        expect(actualFile).toBe(expectedFile);
    });
});