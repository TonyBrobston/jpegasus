import Chance from 'chance';

import canvasService from '../../../src/services/elements/canvasService';

const chance = new Chance();

describe('canvasService', () => {
    const height = chance.integer({min: 0});
    const width = chance.integer({min: 0});
    const img = {
        height,
        width
    };
    const scale = chance.integer({
        max: 1.00,
        min: 0.01
    });
    const scaledHeight = height * scale;
    const scaledWidth = width * scale;
    const canvas = {
        getContext: jest.fn()
    };

    let actualCanvas;
    document.createElement = jest.fn();
    document.createElement.mockReturnValue(canvas);
    const context = {
        drawImage: jest.fn()
    };

    canvas.getContext.mockReturnValue(context);
    beforeAll(() => {
        actualCanvas = canvasService.create(img, scale);

    });

    it('should create a canvasService', () => {
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
    });

    it('should get a imageCanvas context', () => {
        expect(canvas.getContext).toHaveBeenCalledTimes(1);
        expect(canvas.getContext).toHaveBeenCalledWith('2d');
    });

    it('should draw the img on the context of the imageCanvas', () => {
        expect(context.drawImage).toHaveBeenCalledTimes(1);
        expect(context.drawImage).toHaveBeenCalledWith(img, 0, 0, scaledWidth, scaledHeight);
    });

    it('should return a canvasService', () => {
        expect(actualCanvas.height).toBe(scaledHeight);
        expect(actualCanvas.width).toBe(scaledWidth);
    });
});