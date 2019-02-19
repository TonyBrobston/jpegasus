import Chance from 'chance';

import scaleService from '../../src/services/scaleService';
import imageService from '../../src/services/imageService';
import canvasService from '../../src/services/canvasService';

jest.mock('../../src/services/imageService');
jest.mock('../../src/services/canvasService');


const chance = new Chance();

describe('scaleService', () => {
    const file = chance.string();
    const expectedCanvas = chance.string();
    let actualCanvas;

    const scenarios = [
        {
            image: {
                height: chance.natural(),
                width: chance.natural(),
            },
            name: 'no options',
            options: {},
            scale: 1.00,
        },
        {
            image: {
                height: 4000,
                width: 3000,
            },
            name: 'maxHeight scale',
            options: {
                maxHeight: 1200,
            },
            scale: 0.30,
        },
        {
            image: {
                height: 4000,
                width: 3000,
            },
            name: 'maxWidth scale',
            options: {
                maxWidth: 1200,
            },
            scale: 0.40,
        },
        {
            image: {
                height: 1000,
                width: 1000,
            },
            name: 'no scale, height < maxHeight',
            options: {
                maxHeight: 1200,
            },
            scale: 1.00,
        },
        {
            image: {
                height: 1000,
                width: 1000,
            },
            name: 'no scale, width < maxWidth',
            options: {
                maxWidth: 1200,
            },
            scale: 1.00,
        },
        {
            image: {
                height: 1200,
                width: 800,
            },
            name: 'maxHeight scale, width < height',
            options: {
                maxHeight: 600,
                maxWidth: 600,
            },
            scale: 0.50,
        },
        {
            image: {
                height: 800,
                width: 1200,
            },
            name: 'maxWidth scale, height < width',
            options: {
                maxHeight: 600,
                maxWidth: 600,
            },
            scale: 0.50,
        },
    ];

    scenarios.forEach((scenario) => {
        describe(scenario.name, () => {
            beforeAll(async () => {
                imageService.create.mockResolvedValue(scenario.image);
                canvasService.create.mockReturnValue(expectedCanvas);

                actualCanvas = await scaleService.toCanvas(file, scenario.options);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should create an image', () => {
                expect(imageService.create).toHaveBeenCalledTimes(1);
                expect(imageService.create).toHaveBeenCalledWith(file, scenario.options);
            });

            it('should create a canvas', () => {
                expect(canvasService.create).toHaveBeenCalledTimes(1);
                expect(canvasService.create).toHaveBeenCalledWith(
                    file, scenario.image, scenario.scale);
            });

            it('should return a scaled canvasService', () => {
                expect(actualCanvas).toBe(expectedCanvas);
            });
        });
    });
});
