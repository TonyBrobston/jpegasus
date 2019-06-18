import {Chance} from 'chance';

import canvasService from '../../src/services/canvasService';
import imageService from '../../src/services/imageService';
import scaleService from '../../src/services/scaleService';

jest.mock('../../src/services/imageService');
jest.mock('../../src/services/canvasService');

const chance = new Chance();

describe('scaleService', () => {
    const file = new File([chance.string()], chance.string());
    const expectedCanvas = document.createElement('canvas');
    let actualCanvas;

    const scenarios = [
        {
            image: {
                height: chance.natural(),
                width: chance.natural(),
            },
            inputOptions: {},
            name: 'no inputOptions',
            scale: 1.00,
        },
        {
            image: {
                height: 4000,
                width: 3000,
            },
            inputOptions: {
                maxHeight: 1200,
            },
            name: 'maxHeight scale',
            scale: 0.30,
        },
        {
            image: {
                height: 4000,
                width: 3000,
            },
            inputOptions: {
                maxWidth: 1200,
            },
            name: 'maxWidth scale',
            scale: 0.40,
        },
        {
            image: {
                height: 1000,
                width: 1000,
            },
            inputOptions: {
                maxHeight: 1200,
            },
            name: 'no scale, height < maxHeight',
            scale: 1.00,
        },
        {
            image: {
                height: 1000,
                width: 1000,
            },
            inputOptions: {
                maxWidth: 1200,
            },
            name: 'no scale, width < maxWidth',
            scale: 1.00,
        },
        {
            image: {
                height: 1200,
                width: 800,
            },
            inputOptions: {
                maxHeight: 600,
                maxWidth: 600,
            },
            name: 'maxHeight scale, width < height',
            scale: 0.50,
        },
        {
            image: {
                height: 800,
                width: 1200,
            },
            inputOptions: {
                maxHeight: 600,
                maxWidth: 600,
            },
            name: 'maxWidth scale, height < width',
            scale: 0.50,
        },
    ];

    scenarios.forEach((scenario: any) => {
        describe(scenario.name, () => {
            let image;

            beforeAll(async () => {
                image = document.createElement('img');
                image.height = scenario.image.height;
                image.width = scenario.image.width;
                imageService.create = jest.fn(() => Promise.resolve(image));
                canvasService.create = jest.fn(() => Promise.resolve(expectedCanvas));

                actualCanvas = await scaleService.toCanvas(file, scenario.inputOptions);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should create an image', () => {
                expect(imageService.create).toHaveBeenCalledTimes(1);
                expect(imageService.create).toHaveBeenCalledWith(file, scenario.inputOptions);
            });

            it('should create a canvas', () => {
                expect(canvasService.create).toHaveBeenCalledTimes(1);
                expect(canvasService.create).toHaveBeenCalledWith(
                    file, image, scenario.scale);
            });

            it('should return a scaled canvasService', () => {
                expect(actualCanvas).toBe(expectedCanvas);
            });
        });
    });
});
