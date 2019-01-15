import Chance from 'chance';

import canvasService from '../../../src/services/elements/canvasService';

const chance = new Chance();

describe('canvasService', () => {
    const height = chance.integer({min: 0});
    const width = chance.integer({min: 0});
    const image = {
        height,
        width
    };
    const scale = chance.integer({
        max: 1.00,
        min: 0.01
    });
    const scaledHeight = height * scale;
    const scaledWidth = width * scale;
    const canvas = {
        getContext: jest.fn()
    };

    let actualCanvas;

    document.createElement = jest.fn();
    document.createElement.mockReturnValue(canvas);
    const context = {
        drawImage: jest.fn(),
        transform: jest.fn()
    };

    canvas.getContext.mockReturnValue(context);

    describe('create', () => {
        beforeAll(() => {
            actualCanvas = canvasService.create(image, scale, chance.integer());
        });

        it('should create a canvasService', () => {
            expect(document.createElement).toHaveBeenCalledTimes(1);
            expect(document.createElement).toHaveBeenCalledWith('canvas');
        });

        it('should get a imageCanvas context', () => {
            expect(canvas.getContext).toHaveBeenCalledTimes(1);
            expect(canvas.getContext).toHaveBeenCalledWith('2d');
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
                parameters: [-1, 0, 0, 1, scaledWidth, 0],
                width: scaledWidth
            },
            {
                exifOrientation: 3,
                height: scaledHeight,
                parameters: [-1, 0, 0, -1, scaledWidth, scaledHeight],
                width: scaledWidth
            },
            {
                exifOrientation: 4,
                height: scaledHeight,
                parameters: [1, 0, 0, -1, 0, scaledHeight],
                width: scaledWidth
            },
            {
                exifOrientation: 5,
                height: scaledWidth,
                parameters: [0, 1, 1, 0, 0, 0],
                width: scaledHeight
            },
            {
                exifOrientation: 6,
                height: scaledWidth,
                parameters: [0, 1, -1, 0, scaledHeight, 0],
                width: scaledHeight
            },
            {
                exifOrientation: 7,
                height: scaledWidth,
                parameters: [0, -1, -1, 0, scaledHeight, scaledWidth],
                width: scaledHeight
            },
            {
                exifOrientation: 8,
                height: scaledWidth,
                parameters: [0, -1, 1, 0, 0, scaledWidth],
                width: scaledHeight
            }
        ];

        expectedRotationScenarios.forEach((scenario) => {
            it(`should perform the correct rotation - orientation ${scenario.exifOrientation}`, () => {
                context.transform.mockClear();
                actualCanvas = canvasService.create(image, scale, scenario.exifOrientation);

                expect(actualCanvas.height).toBe(scenario.height);
                expect(actualCanvas.width).toBe(scenario.width);

                expect(context.transform).toHaveBeenCalledTimes(1);
                expect(context.transform).toHaveBeenCalledWith(...scenario.parameters);
            });
        });
    });
});
