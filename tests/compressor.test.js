import Chance from 'chance';

import compressor from '../src/compressor';
import image from '../src/image';

jest.mock('../src/image');

const chance = new Chance();

describe('file compression', async () => {
    const file = new File([], '');
    const img = {
        height: chance.integer({min: 0}),
        width: chance.integer({min: 0})
    };

    document.createElement = jest.fn();
    const canvas = {
        getContext: jest.fn(),
    };
    const context = {
        drawImage: jest.fn()
    };

    document.createElement.mockReturnValue(canvas);
    canvas.getContext.mockReturnValue(context);
    image.build.mockResolvedValue(img);

    compressor.compress(file);

    it('should have created a canvas', () => {
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
    });

    it('should have created a canvas context', () => {
        expect(canvas.getContext).toHaveBeenCalledTimes(1);
        expect(canvas.getContext).toHaveBeenCalledWith('2d');
    });

    it('should have built an img', () => {
        expect(image.build).toHaveBeenCalledTimes(1);
        expect(image.build).toHaveBeenCalledWith(file);
    });

    it('should have drawn the img on the context of the canvas', () => {
        expect(context.drawImage).toHaveBeenCalledTimes(1);
        const scaledWidth = img.width * 0.29;
        const scaledHeight = img.height * 0.29;
        expect(context.drawImage).toHaveBeenCalledWith(img, 0, 0, scaledWidth, scaledHeight);
    });
});
