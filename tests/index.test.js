import Chance from 'chance';

import index from '../src/index';
import scaleService from '../src/services/sizing/scaleService';
import qualityService from '../src/services/sizing/qualityService';

jest.mock('../src/services/sizing/scaleService');
jest.mock('../src/services/sizing/qualityService');

const chance = new Chance();

describe('index', async () => {
    const file = new File([chance.integer({min: 0})], chance.string());
    const options = undefined;
    const defaultOptions = {
        targetFileSize: 500000
    };
    const canvas = chance.string();
    const expectedCompressedFile = new File([chance.integer({min: 0})], chance.string());
    let actualCompressedFile;

    scaleService.toCanvas.mockResolvedValue(canvas);
    qualityService.toFile.mockReturnValue(expectedCompressedFile);

    beforeAll(async () => {
        actualCompressedFile = await index.compress(file, options);
    });

    it('should convert file to canvasService and scale', async () => {
        expect(scaleService.toCanvas).toHaveBeenCalledTimes(1);
        expect(scaleService.toCanvas).toHaveBeenCalledWith(file, defaultOptions);
    });

    it('should convert file to file and reduce quality', () => {
        expect(qualityService.toFile).toHaveBeenCalledTimes(1);
        expect(qualityService.toFile).toHaveBeenCalledWith(file, canvas, defaultOptions);
    });

    it('should return a compressed file', () => {
        expect(actualCompressedFile).toBe(expectedCompressedFile);
    });
});
