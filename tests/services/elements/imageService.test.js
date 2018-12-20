import Chance from 'chance';

import imageService from '../../../src/services/elements/imageService';

const chance = new Chance();

describe('imageService', () => {
    const file = new File([], '');
    const fileReader = {
        addEventListener: jest.fn((_, evtHandler) => { evtHandler(); }),
        readAsDataURL: jest.fn(),
        result: chance.string
    };
    const image = {
        addEventListener: jest.fn((_, evtHandler) => { evtHandler(); })
    };
    let actualImageSource;

    window.FileReader = jest.fn(() => fileReader);
    window.Image = jest.fn(() => image);

    beforeAll(async () => {
        actualImageSource = await imageService.create(file);
    });

    it('should create file reader', async () => {
        expect(window.FileReader).toHaveBeenCalledTimes(1);
        expect(window.FileReader).toHaveBeenCalledWith();
    });

    it('should fire file loader onload of file reader', () => {
        expect(fileReader.addEventListener).toHaveBeenCalledTimes(1);
        expect(fileReader.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
    });

    it('should fire read as data url on read of file reader', () => {
        expect(fileReader.readAsDataURL).toHaveBeenCalledTimes(1);
        expect(fileReader.readAsDataURL).toHaveBeenCalledWith(file);
    });

    it('should return image source from file reader', () => {
        expect(actualImageSource).toBe(image);
    });

    it('should create an image', () => {
        expect(window.Image).toHaveBeenCalledTimes(1);
        expect(window.Image).toHaveBeenCalledWith();
    });

    it('should fire file loader onload of image', () => {
        expect(image.addEventListener).toHaveBeenCalledTimes(1);
        expect(image.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
    });

    it('should have image source from file reader result', () => {
        expect(image.src).toBe(fileReader.result);
    })
});
