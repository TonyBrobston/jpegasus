import {Chance} from 'chance';

import canvasService from '../../src/services/canvasService';
import exifService from '../../src/services/exifService';

const chance = new Chance();

jest.mock('../../src/services/exifService');

describe('canvasService', () => {
    const file = new File([chance.string()], chance.string());
    const image = document.createElement('img');
    image.height = 300;
    image.width = 500;
    const scale = chance.floating({
        fixed: 2,
        max: 1.00,
        min: 0.01,
    });
    const scaledHeight = image.height * scale;
    const scaledWidth = image.width * scale;

    const expectedOrientation = 1;

    let actualCanvas: HTMLCanvasElement;

    exifService.determineOrientation = jest.fn(() => Promise.resolve(expectedOrientation));

    describe('create', () => {
        beforeAll(async () => {
            actualCanvas = await canvasService.create(file, image, scale);
        });

        it('should determine orientation', () => {
            expect(exifService.determineOrientation).toHaveBeenCalledTimes(1);
            expect(exifService.determineOrientation).toHaveBeenCalledWith(file);
        });

        it('should return a canvasService', () => {
            expect(actualCanvas.height).toBe(Math.floor(scaledHeight));
            expect(actualCanvas.width).toBe(Math.floor(scaledWidth));
        });
    });

    describe('correctExifRotation', () => {
        const transform = jest.fn();
        const canvas = document.createElement('canvas');
        canvas.getContext = jest.fn().mockReturnValue({
            drawImage: jest.fn(),
            transform,
        });
        document.createElement = jest.fn(() => canvas);

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

        expectedRotationScenarios.forEach((scenario: {
            exifOrientation: number,
            height: number,
            parameters: number[],
            width: number,
        }) => {
            it(`should correct orientation ${scenario.exifOrientation}`, async () => {
                transform.mockClear();
                exifService.determineOrientation = jest.fn(() => Promise.resolve(scenario.exifOrientation));

                actualCanvas = await canvasService.create(file, image, scale);

                expect(actualCanvas.height).toBe(Math.floor(scenario.height));
                expect(actualCanvas.width).toBe(Math.floor(scenario.width));

                expect(transform).toHaveBeenCalledTimes(1);
                expect(transform).toHaveBeenCalledWith(...scenario.parameters);
            });
        });
    });

    describe('cannot read context', () => {
        it('should throw if context is falsy', async () => {
            const canvas = document.createElement('canvas');
            canvas.getContext = jest.fn(() => null);
            document.createElement = jest.fn(() => canvas);

            try {
                await canvasService.create(file, image, scale);
            } catch (error) {
                expect(error.message).toBe('Could not get CanvasRenderingContext2D from HTMLCanvasElement.');
            }
        });
    });
});
