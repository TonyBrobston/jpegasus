import Chance from 'chance';

import imageService from '../../../src/services/elements/imageService';

const chance = new Chance();

describe('imageService', () => {
    const scenarios = [
        {
            expectedCrossOrigin: 'Anonymous',
            name: 'Allow CORS',
            options: {
                allowCrossOriginResourceSharing: true
            }
        },
        {
            expectedCrossOrigin: undefined,
            name: 'Do not allow CORS',
            options: {
                allowCrossOriginResourceSharing: false
            }
        }
    ];

    scenarios.forEach((scenario) => {
        const file = new File([], '');
        let image,
            expectedUrl,
            actualImageSource;

        describe(scenario.name, () => {
            beforeAll(async () => {
                image = {
                    addEventListener: jest.fn((_, evtHandler) => { evtHandler(); })
                };
                window.Image = jest.fn(() => image);
                global.URL.createObjectURL = jest.fn();
                expectedUrl = chance.url();
                global.URL.createObjectURL.mockReturnValue(expectedUrl)

                actualImageSource = await imageService.create(file, scenario.options);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should return image source from file reader', () => {
                expect(actualImageSource).toBe(image);
            });

            it('should create an image', () => {
                expect(window.Image).toHaveBeenCalledTimes(1);
                expect(window.Image).toHaveBeenCalledWith();
            });

            it('should fire onload on load of image source', () => {
                expect(image.addEventListener).toHaveBeenCalledTimes(1);
                expect(image.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
            });

            it(`should only allow CORS if ${scenario.expectedCrossOrigin}`, () => {
                expect(image.crossOrigin).toBe(scenario.expectedCrossOrigin);
            });

            it('should have called URL createObjectURL', () => {
                expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
                expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
            });

            it('should return correct url', () => {
                expect(image.src).toBe(expectedUrl);
            });

            it('should have image source from file reader result', () => {
                expect(image.src).toBe(expectedUrl);
            })
        });
    });
});
