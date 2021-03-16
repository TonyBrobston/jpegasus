import {Chance} from 'chance';
import {Options} from '../../src/types/Options';

import * as exifOrientation from '@ginpei/exif-orientation';
import canvasService from '../../src/services/canvasService';

const chance = new Chance();

jest.mock('@ginpei/exif-orientation');

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
    const options = {
        fixImageOrientation: true,
        transparencyFillColor: '#FOO'
    } as Options;
    const expectedOrientation = {
        flipped: false,
        rotation: 0,
    };
    const drawImage = jest.fn();
    const fillRect = jest.fn();
    const transform = jest.fn();
    const context = {
        drawImage,
        fillStyle: '#FOO',
        fillRect,
        transform,
    };
    const canvas = document.createElement('canvas');
    canvas.getContext = jest.fn().mockReturnValue(context);
    document.createElement = jest.fn(() => canvas);

    let actualCanvas: HTMLCanvasElement;

    jest.spyOn(exifOrientation, 'getOrientation').mockResolvedValue(expectedOrientation);

    describe('create', () => {
        beforeAll(async () => {
            actualCanvas = await canvasService.create(file, image, scale, options);
        });

        it('should determine orientation', () => {
            expect(exifOrientation.getOrientation).toHaveBeenCalledTimes(1);
            expect(exifOrientation.getOrientation).toHaveBeenCalledWith(file);
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

    describe('correctExifRotation', () => {
        const expectedRotationScenarios = [
            {
                exifOrientation: {rotation: 0, flipped: true},
                height: scaledHeight,
                name: '2',
                parameters: [-1, 0, 0, 1, scaledWidth, 0],
                width: scaledWidth,
            },
            {
                exifOrientation: {rotation: 180, flipped: false},
                height: scaledHeight,
                name: '3',
                parameters: [-1, 0, 0, -1, scaledWidth, scaledHeight],
                width: scaledWidth,
            },
            {
                exifOrientation: {rotation: 180, flipped: true},
                height: scaledHeight,
                name: '4',
                parameters: [1, 0, 0, -1, 0, scaledHeight],
                width: scaledWidth,
            },
            {
                exifOrientation: {rotation: 90, flipped: true},
                height: scaledWidth,
                name: '5',
                parameters: [0, 1, 1, 0, 0, 0],
                width: scaledHeight,
            },
            {
                exifOrientation: {rotation: 90, flipped: false},
                height: scaledWidth,
                name: '6',
                parameters: [0, 1, -1, 0, scaledHeight, 0],
                width: scaledHeight,
            },
            {
                exifOrientation: {rotation: 270, flipped: true},
                height: scaledWidth,
                name: '7',
                parameters: [0, -1, -1, 0, scaledHeight, scaledWidth],
                width: scaledHeight,
            },
            {
                exifOrientation: {rotation: 270, flipped: false},
                height: scaledWidth,
                name: '8',
                parameters: [0, -1, 1, 0, 0, scaledWidth],
                width: scaledHeight,
            },
        ];

        expectedRotationScenarios.forEach((scenario: {
            exifOrientation: exifOrientation.IOrientationInfo,
            height: number,
            name: string,
            parameters: number[],
            width: number,
        }) => {
            it(`should correct orientation ${scenario.name}`, async () => {
                transform.mockClear();
                jest.spyOn(exifOrientation, 'getOrientation').mockResolvedValue(scenario.exifOrientation);

                actualCanvas = await canvasService.create(file, image, scale, options);

                expect(actualCanvas.height).toBe(Math.floor(scenario.height));
                expect(actualCanvas.width).toBe(Math.floor(scenario.width));

                expect(transform).toHaveBeenCalledTimes(1);
                expect(transform).toHaveBeenCalledWith(...scenario.parameters);
            });
        });

        it('should not change orientation 1', async () => {
            transform.mockClear();
            jest.spyOn(exifOrientation, 'getOrientation').mockResolvedValue({rotation: 0, flipped: false});

            actualCanvas = await canvasService.create(file, image, scale, options);

            expect(actualCanvas.height).toBe(Math.floor(scaledHeight));
            expect(actualCanvas.width).toBe(Math.floor(scaledWidth));

            expect(transform).not.toHaveBeenCalled();
        });

        it('should not change orientation if invalid rotation', async () => {
            transform.mockClear();
            jest.spyOn(exifOrientation, 'getOrientation').mockResolvedValue({rotation: -1, flipped: true});

            actualCanvas = await canvasService.create(file, image, scale, options);

            expect(actualCanvas.height).toBe(Math.floor(scaledHeight));
            expect(actualCanvas.width).toBe(Math.floor(scaledWidth));

            expect(transform).not.toHaveBeenCalled();
        });

        it('should not change orientation for undefined', async () => {
            transform.mockClear();
            jest.spyOn(exifOrientation, 'getOrientation').mockResolvedValue(undefined);

            actualCanvas = await canvasService.create(file, image, scale, options);

            expect(actualCanvas.height).toBe(Math.floor(scaledHeight));
            expect(actualCanvas.width).toBe(Math.floor(scaledWidth));

            expect(transform).not.toHaveBeenCalled();
        });

        it('should not change orientation if throw', async () => {
            transform.mockClear();
            jest.spyOn(exifOrientation, 'getOrientation').mockImplementation(async () => {
                throw new Error();
            });

            actualCanvas = await canvasService.create(file, image, scale, options);

            expect(actualCanvas.height).toBe(Math.floor(scaledHeight));
            expect(actualCanvas.width).toBe(Math.floor(scaledWidth));

            expect(transform).not.toHaveBeenCalled();
        });
    });

    describe('cannot read context', () => {
        it('should throw if context is falsy', async () => {
            const canvas = document.createElement('canvas');
            canvas.getContext = jest.fn(() => null);
            document.createElement = jest.fn(() => canvas);

            try {
                await canvasService.create(file, image, scale, options);
            } catch (error) {
                expect(error.message).toBe('Could not get CanvasRenderingContext2D from HTMLCanvasElement.');
            }
        });

        it('should throw with message if context is falsy', async () => {
            const canvas = document.createElement('canvas');
            canvas.getContext = jest.fn(() => null);
            document.createElement = jest.fn(() => canvas);

            await expect(canvasService.create(file, image, scale, options)).rejects.toThrow();
        });
    });
});
