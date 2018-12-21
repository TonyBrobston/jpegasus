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
    let actualCanvas;

    const scenarios = [
        {
            options: {},
            scale: 1,
            image: {
                height: chance.integer({min: 1}),
                width: chance.integer({min: 1})
            }
        },
        {
            options: {
                maxHeight: 1200
            },
            scale: 4032 / 1200,
            image: {
                height: 4032,
                width: 3024
            }
        }
    ];

    scenarios.forEach((scenario) => {
        describe(scenario.scale, () => {
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
                expect(imageService.create).toHaveBeenCalledWith(file);
            });

            it('should create a canvas', () => {
                expect(canvasService.create).toHaveBeenCalledTimes(1);
                expect(canvasService.create).toHaveBeenCalledWith(scenario.image, scenario.scale);
            });

            it('should return a scaled canvasService', () => {
                expect(actualCanvas).toBe(expectedCanvas);
            });
        });
    });
});