import Chance from 'chance';

import scaleService from '../../../src/services/sizing/scaleService';
import imageService from '../../../src/services/elements/imageService';
import canvasService from '../../../src/services/elements/canvasService';

jest.mock('../../../src/services/elements/imageService');
jest.mock('../../../src/services/elements/canvasService');

const chance = new Chance();

describe('scaleService', () => {
    const file = chance.string();
    const scale = chance.string();
    const image = chance.string();
    const expectedCanvas = chance.string();
    let actualCanvas;

    imageService.create.mockResolvedValue(image);
    canvasService.create.mockReturnValue(expectedCanvas);

    beforeAll(async () => {
        actualCanvas = await scaleService.toCanvas(file, scale)
    });

    it('should create and image', () => {
        expect(imageService.create).toHaveBeenCalledTimes(1);
        expect(imageService.create).toHaveBeenCalledWith(file);
    });

    it('should create and image', () => {
        expect(canvasService.create).toHaveBeenCalledTimes(1);
        expect(canvasService.create).toHaveBeenCalledWith(image, scale);
    });

    it('should return a scaled canvasService', () => {
        expect(actualCanvas).toBe(expectedCanvas);
    });
});