import {Chance} from 'chance';
import {Options} from '../../src/types/Options';

import canvasService from '../../src/services/canvasService';
import exifService from '../../src/services/exifService';

const chance = new Chance();

jest.mock('../../src/services/exifService');

describe('canvasService', (): void => {
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
    const options = {
        fixImageOrientation: true,
        transparencyFillColor: '#FOO'
    } as Options;

    const expectedOrientation = 1;
    const drawImage = jest.fn();
    const fillRect = jest.fn();
    const transform = jest.fn();
    const context = {
        drawImage,
        fillRect,
        fillStyle: '',
        transform,
    };
    const canvas = document.createElement('canvas');
    canvas.getContext = jest.fn().mockReturnValue(context);
    document.createElement = jest.fn((): HTMLCanvasElement => canvas);

    let actualCanvas: HTMLCanvasElement;

    exifService.determineOrientation = jest.fn((): Promise<number> => Promise.resolve(expectedOrientation));

    afterEach((): void => {
        transform.mockClear();
    });

    describe('create', (): void => {
        beforeAll(async (): Promise<void> => {
            actualCanvas = await canvasService.create(file, image, scale, options);
        });

        it('should determine orientation', (): void => {
            expect(exifService.determineOrientation).toHaveBeenCalledTimes(1);
            expect(exifService.determineOrientation).toHaveBeenCalledWith(file);
        });

        it('should set fill style', (): void => {
            expect(context.fillStyle).toBe(options.transparencyFillColor);
        });

        it('should fill rectangle', (): void => {
            expect(fillRect).toHaveBeenCalledTimes(1);
            expect(fillRect).toHaveBeenCalledWith(0,0, scaledWidth, scaledHeight);
        });

        it('should draw image', (): void => {
            expect(drawImage).toHaveBeenCalledTimes(1);
            expect(drawImage).toHaveBeenCalledWith(image, 0,0, scaledWidth, scaledHeight);
        });

        it('should return a canvas', (): void => {
            expect(actualCanvas.height).toBe(Math.floor(scaledHeight));
            expect(actualCanvas.width).toBe(Math.floor(scaledWidth));
        });
    });

    describe('correctExifRotation', (): void => {
        const expectedRotationScenarios = [
            {
                exifOrientation: 2,
                height: scaledHeight,
                parameters: [-1, 0, 0, 1, scaledWidth, 0],
                width: scaledWidth,
            },
            {
                exifOrientation: 3,
                height: scaledHeight,
                parameters: [-1, 0, 0, -1, scaledWidth, scaledHeight],
                width: scaledWidth,
            },
            {
                exifOrientation: 4,
                height: scaledHeight,
                parameters: [1, 0, 0, -1, 0, scaledHeight],
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
                parameters: [0, 1, -1, 0, scaledHeight, 0],
                width: scaledHeight,
            },
            {
                exifOrientation: 7,
                height: scaledWidth,
                parameters: [0, -1, -1, 0, scaledHeight, scaledWidth],
                width: scaledHeight,
            },
            {
                exifOrientation: 8,
                height: scaledWidth,
                parameters: [0, -1, 1, 0, 0, scaledWidth],
                width: scaledHeight,
            },
        ];

        expectedRotationScenarios.forEach((scenario: {
            exifOrientation: number,
            height: number,
            parameters: number[],
            width: number,
        }): void => {
            it(`should correct orientation ${scenario.exifOrientation}`, async (): Promise<void> => {
                exifService.determineOrientation = jest.fn((): Promise<number> => Promise.resolve(scenario.exifOrientation));

                actualCanvas = await canvasService.create(file, image, scale, options);

                expect(actualCanvas.height).toBe(Math.floor(scenario.height));
                expect(actualCanvas.width).toBe(Math.floor(scenario.width));

                expect(transform).toHaveBeenCalledTimes(1);
                expect(transform).toHaveBeenCalledWith(...scenario.parameters);
            });
        });

        it('should NOT correct orientation', async (): Promise<void> => {
            const exifOrientation = 6;
            exifService.determineOrientation = jest.fn((): Promise<number> => Promise.resolve(exifOrientation));

            actualCanvas = await canvasService.create(file, image, scale, {
                fixImageOrientation: false,
            } as Options);

            expect(actualCanvas.height).toBe(Math.floor(scaledHeight));
            expect(actualCanvas.width).toBe(Math.floor(scaledWidth));

            expect(transform).not.toHaveBeenCalled();
        });
    });

    describe('cannot read context', (): void => {
        it('should throw if context is falsy', async (): Promise<void> => {
            canvas.getContext = jest.fn((): null => null);
            document.createElement = jest.fn((): HTMLCanvasElement => canvas);

            try {
                await canvasService.create(file, image, scale, options);
            } catch (error) {
                expect(error.message).toBe('Could not get CanvasRenderingContext2D from HTMLCanvasElement.');
            }
        });

        it('should throw with message if context is falsy', async (): Promise<void> => {
            canvas.getContext = jest.fn((): null => null);
            document.createElement = jest.fn((): HTMLCanvasElement => canvas);

            await expect(canvasService.create(file, image, scale, options)).rejects.toThrow();
        });
    });
});
