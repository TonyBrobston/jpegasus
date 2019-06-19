import {Chance} from 'chance';

import canvasService from '../../src/services/canvasService';
import exifService from '../../src/services/exifService';

const chance = new Chance();

jest.mock('../../src/services/exifService');

describe('canvasService', () => {
    const height = chance.natural();
    const width = chance.natural();
    const file = new File([chance.string()], chance.string());
    const image = document.createElement('img');
    image.height = height;
    image.width = width;
    const scale = chance.integer({
        max: 1.00,
        min: 0.01,
    });
    const scaledHeight = height * scale;
    const scaledWidth = width * scale;
    const transform = jest.fn(() => null);
    const drawImage = jest.fn(() => null);
    const contextReturn = {
        drawImage,
        transform,
    };
    const getContext = jest.fn(() => contextReturn);
    const canvas = {
        getContext,
        height: scaledHeight,
        width: scaledWidth,
    };
    const expectedOrientation = chance.integer();

    let actualCanvas: HTMLCanvasElement;

    document.createElement = jest.fn().mockReturnValue(canvas);

    exifService.determineOrientation = jest.fn(() => Promise.resolve(expectedOrientation));

    describe('create', () => {
        beforeAll(async () => {
            actualCanvas = await canvasService.create(file, image, scale);
        });

        it('should create a canvasService', () => {
            expect(document.createElement).toHaveBeenCalledTimes(1);
            expect(document.createElement).toHaveBeenCalledWith('canvas');
        });

        it('should get a imageCanvas context', () => {
            expect(getContext).toHaveBeenCalledTimes(1);
            expect(getContext).toHaveBeenCalledWith('2d');
        });

        it('should determine orientation', () => {
            expect(exifService.determineOrientation).toHaveBeenCalledTimes(1);
            expect(exifService.determineOrientation).toHaveBeenCalledWith(file);
        });

        it('should draw the image on the context of the imageCanvas', () => {
            expect(drawImage).toHaveBeenCalledTimes(1);
            expect(drawImage).toHaveBeenCalledWith(image, 0, 0, scaledWidth, scaledHeight);
        });

        it('should return a canvasService', () => {
            expect(actualCanvas.height).toBe(scaledHeight);
            expect(actualCanvas.width).toBe(scaledWidth);
        });
    });

    describe('correctExifRotation', () => {
        const expectedRotationScenarios = [
            {
                exifOrientation: 2,
                height: scaledHeight,
                parameters: [- 1, 0, 0, 1, scaledWidth, 0],
                width: scaledWidth,
            },
            {
                exifOrientation: 3,
                height: scaledHeight,
                parameters: [- 1, 0, 0, - 1, scaledWidth, scaledHeight],
                width: scaledWidth,
            },
            {
                exifOrientation: 4,
                height: scaledHeight,
                parameters: [1, 0, 0, - 1, 0, scaledHeight],
                width: scaledWidth,
            },
            {
                exifOrientation: 5,
                height: scaledWidth,
                parameters: [0, 1, 1, 0, 0, 0],
                width: scaledHeight,
            },
            {
                exifOrientation: 6,
                height: scaledWidth,
                parameters: [0, 1, - 1, 0, scaledHeight, 0],
                width: scaledHeight,
            },
            {
                exifOrientation: 7,
                height: scaledWidth,
                parameters: [0, - 1, - 1, 0, scaledHeight, scaledWidth],
                width: scaledHeight,
            },
            {
                exifOrientation: 8,
                height: scaledWidth,
                parameters: [0, - 1, 1, 0, 0, scaledWidth],
                width: scaledHeight,
            },
        ];

        expectedRotationScenarios.forEach((scenario: any) => {
            it(`should correct orientation ${scenario.exifOrientation}`, async () => {
                transform.mockClear();
                exifService.determineOrientation = jest.fn(() => Promise.resolve(scenario.exifOrientation));

                actualCanvas = await canvasService.create(file, image, scale);

                expect(actualCanvas.height).toBe(scenario.height);
                expect(actualCanvas.width).toBe(scenario.width);

                expect(transform).toHaveBeenCalledTimes(1);
                expect(transform).toHaveBeenCalledWith(...scenario.parameters);
            });
        });
    });
});
