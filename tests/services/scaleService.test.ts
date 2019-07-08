import {Chance} from 'chance';

import canvasService from '../../src/services/canvasService';
import imageService from '../../src/services/imageService';
import scaleService from '../../src/services/scaleService';
import {Options} from '../../src/types/Options';

jest.mock('../../src/services/imageService');
jest.mock('../../src/services/canvasService');

const chance = new Chance();

describe('scaleService', () => {
    const file = new File([chance.string()], chance.string());
    const expectedCanvas = document.createElement('canvas');
    let actualCanvas: HTMLCanvasElement;

    const scenarios = [
        {
            image: {
                height: chance.natural(),
                width: chance.natural(),
            },
            inputOptions: {
                scaleImageBy: 1.00,
            } as Options,
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
                scaleImageBy: 1.00,
            } as Options,
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
                scaleImageBy: 1.00,
            } as Options,
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
                scaleImageBy: 1.00,
            } as Options,
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
                scaleImageBy: 1.00,
            } as Options,
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
                scaleImageBy: 1.00,
            } as Options,
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
                scaleImageBy: 1.00,
            } as Options,
            name: 'maxWidth scale, height < width',
            scale: 0.50,
        },
        {
            image: {
                height: 400,
                scaleImageBy: 1.00,
                width: 400,
            },
            inputOptions: {
                scaleImageBy: 0.5,
            } as Options,
            name: 'scale dimensions by',
            scale: 0.5,
        },
        {
            image: {
                height: 1000,
                width: 500,
            },
            inputOptions: {
                maxHeight: 1200,
                scaleImageBy: 2.00,
            } as Options,
            name: 'scale dimensions by, limit to maxHeight',
            scale: 1.2,
        },
        {
            image: {
                height: 500,
                width: 1000,
            },
            inputOptions: {
                maxWidth: 1200,
                scaleImageBy: 2.00,
            } as Options,
            name: 'scale dimensions by, limit to maxWidth',
            scale: 1.2,
        },
        {
            image: {
                height: 400,
                width: 400,
            },
            inputOptions: {
                maxHeight: 900,
                scaleImageBy: 0.5,
            } as Options,
            name: 'scale dimensions by, do not limit to maxHeight',
            scale: 0.5,
        },
        {
            image: {
                height: 400,
                width: 400,
            },
            inputOptions: {
                maxWidth: 900,
                scaleImageBy: 0.5,
            } as Options,
            name: 'scale dimensions by, do not limit to maxWidth',
            scale: 0.5,
        },
    ];

    scenarios.forEach((scenario: {
        image: {
            height: number,
            width: number,
        },
        inputOptions: Options,
        name: string,
        scale: number,
    }) => {
        describe(scenario.name, () => {
            let image: HTMLImageElement;

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
