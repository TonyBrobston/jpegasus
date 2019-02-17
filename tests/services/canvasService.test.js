import Chance from 'chance';

import canvasService from '../../src/services/canvasService';
import exifService from '../../src/services/exifService';

const chance = new Chance();

jest.mock('../../src/services/exifService');

describe('canvasService', () => {
    const height = chance.natural();
    const width = chance.natural();
    const file = chance.string();
    const image = {
        height,
        width,
    };
    const scale = chance.integer({
        max: 1.00,
        min: 0.01,
    });
    const scaledHeight = height * scale;
    const scaledWidth = width * scale;
    const canvas = {
        getContext: jest.fn(),
    };
    const expectedOrientation = chance.integer();

    let actualCanvas;

    document.createElement = jest.fn();
    document.createElement.mockReturnValue(canvas);
    const context = {
        drawImage: jest.fn(),
        transform: jest.fn(),
    };

    canvas.getContext.mockReturnValue(context);
    exifService.determineOrientation.mockResolvedValue(expectedOrientation);

    describe('create', () => {
        beforeAll(async () => {
            actualCanvas = await canvasService.create(file, image, scale);
        });

        it('should addMetadata a canvasService', () => {
            expect(document.createElement).toHaveBeenCalledTimes(1);
            expect(document.createElement).toHaveBeenCalledWith('canvas');
        });

        it('should get a imageCanvas context', () => {
            expect(canvas.getContext).toHaveBeenCalledTimes(1);
            expect(canvas.getContext).toHaveBeenCalledWith('2d');
        });

        it('should determine orientation', () => {
            expect(exifService.determineOrientation).toHaveBeenCalledTimes(1);
            expect(exifService.determineOrientation).toHaveBeenCalledWith(file);
        });

        it('should draw the image on the context of the imageCanvas', () => {
            expect(context.drawImage).toHaveBeenCalledTimes(1);
            expect(context.drawImage).toHaveBeenCalledWith(image, 0, 0, scaledWidth, scaledHeight);
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

        expectedRotationScenarios.forEach((scenario) => {
            it(`should correct orientation ${scenario.exifOrientation}`, async () => {
                context.transform.mockClear();
                exifService.determineOrientation.mockResolvedValue(scenario.exifOrientation);

                actualCanvas = await canvasService.create(file, image, scale);

                expect(actualCanvas.height).toBe(scenario.height);
                expect(actualCanvas.width).toBe(scenario.width);

                expect(context.transform).toHaveBeenCalledTimes(1);
                expect(context.transform).toHaveBeenCalledWith(...scenario.parameters);
            });
        });
    });
});
