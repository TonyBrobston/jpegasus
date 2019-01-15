import Chance from 'chance';

import scaleService from '../../../src/services/sizing/scaleService';
import imageService from '../../../src/services/elements/imageService';
import canvasService from '../../../src/services/elements/canvasService';

jest.mock('../../../src/services/elements/imageService');
jest.mock('../../../src/services/elements/canvasService');

const chance = new Chance();

describe('scaleService', () => {
    const file = chance.string();
    const expectedCanvas = chance.string();
    let actualCanvas,
        expectedExifOrientation;

    const scenarios = [
        {
            image: {
                height: chance.integer({min: 1}),
                width: chance.integer({min: 1})
            },
            name: 'no options',
            options: {},
            scale: 1.00
        },
        {
            image: {
                height: 4000,
                width: 3000
            },
            name: 'maxHeight scale',
            options: {
                maxHeight: 1200
            },
            scale: 0.30
        },
        {
            image: {
                height: 4000,
                width: 3000
            },
            name: 'maxWidth scale',
            options: {
                maxWidth: 1200
            },
            scale: 0.40
        },
        {
            image: {
                height: 1000,
                width: 1000
            },
            name: 'no scale, height < maxHeight',
            options: {
                maxHeight: 1200
            },
            scale: 1.00
        },
        {
            image: {
                height: 1000,
                width: 1000
            },
            name: 'no scale, width < maxWidth',
            options: {
                maxWidth: 1200
            },
            scale: 1.00
        },
        {
            image: {
                height: 1200,
                width: 800
            },
            name: 'maxHeight scale, width < height',
            options: {
                maxHeight: 600,
                maxWidth: 600
            },
            scale: 0.50
        },
        {
            image: {
                height: 800,
                width: 1200
            },
            name: 'maxWidth scale, height < width',
            options: {
                maxHeight: 600,
                maxWidth: 600
            },
            scale: 0.50
        }
    ];

    scenarios.forEach((scenario) => {
        describe(scenario.name, () => {
            beforeAll(async () => {
                imageService.create.mockResolvedValue(scenario.image);
                canvasService.create.mockReturnValue(expectedCanvas);

                expectedExifOrientation = chance.integer();

                actualCanvas = await scaleService.toCanvas(file, scenario.options, expectedExifOrientation);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should create an image', () => {
                expect(imageService.create).toHaveBeenCalledTimes(1);
                expect(imageService.create).toHaveBeenCalledWith(file);
            });

            it('should create a canvas', () => {
                expect(canvasService.create).toHaveBeenCalledTimes(1);
                expect(canvasService.create).toHaveBeenCalledWith(scenario.image, scenario.scale, expectedExifOrientation);
            });

            it('should return a scaled canvasService', () => {
                expect(actualCanvas).toBe(expectedCanvas);
            });
        });
    });
});
