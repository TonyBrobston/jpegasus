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
        getContext: jest.fn()
    };

    document.createElement.mockReturnValue(canvas);
    image.build.mockReturnValue(img);

    compressor.compress(file);

    it('should have created a canvas', () => {
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
    });

    it('should have created a canvas context', () => {
        expect(canvas.getContext).toHaveBeenCalledTimes(1);
        expect(canvas.getContext).toHaveBeenCalledWith('2d');
    });

    // it('should have built an img', () => {
    //     expect(image.build).toHaveBeenCalledTimes(1);
    //     expect(image.build).toHaveBeenCalledWith(file);
    // });
});
