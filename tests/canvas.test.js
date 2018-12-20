import canvas from '../src/canvas';
import Chance from 'chance';

const chance = new Chance();

describe('canvas', () => {
    const expectedCanvas = {};
    let actualCanvas;
    const height = chance.integer({min: 0});
    const width = chance.integer({min: 0});

    document.createElement = jest.fn();

    document.createElement.mockReturnValue(expectedCanvas);

    beforeAll(() => {
        actualCanvas = canvas.create(height, width);
    });

    it('should create a canvas', () => {
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
    });

    it('should return a canvas', () => {
        expect(actualCanvas.height).toBe(height);
        expect(actualCanvas.width).toBe(width);
    });
});
