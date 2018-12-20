import Chance from 'chance';

import index from '../src/index';
import scaleService from '../src/services/sizing/scaleService';
import qualityService from '../src/services/sizing/qualityService';

jest.mock('../src/services/sizing/scaleService');
jest.mock('../src/services/sizing/qualityService');

const chance = new Chance();

//todo: compare first and second file to determine if the second is actually smaller than the first
describe('index', async () => {
    const filename = chance.string();
    const file = new File([chance.integer({min: 0})], filename);
    const scale = 0.29;
    const canvas = chance.string();
    const quality = 0.5;
    const expectedCompressedFile = new File([chance.integer({min: 0})], chance.string());
    let actualCompressedFile;

    scaleService.toCanvas.mockResolvedValue(canvas);
    qualityService.toFile.mockReturnValue(expectedCompressedFile);

    beforeAll(async () => {
        actualCompressedFile = await index.compress(file);
    });

    it('should convert file to canvasService and scale', async () => {
        expect(scaleService.toCanvas).toHaveBeenCalledTimes(1);
        expect(scaleService.toCanvas).toHaveBeenCalledWith(file, scale);
    });

    it('should convert file to file and reduce quality', () => {
        expect(qualityService.toFile).toHaveBeenCalledTimes(1);
        expect(qualityService.toFile).toHaveBeenCalledWith(canvas, quality, filename);
    });

    it('should return a compressed file', () => {
        expect(actualCompressedFile).toBe(expectedCompressedFile);
    });
});
