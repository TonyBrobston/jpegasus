import {Chance} from 'chance';

import imageService from '../../src/services/imageService';

const chance = new Chance();

describe('imageService', () => {
    describe('happy path', () => {
        const scenarios = [
            {
                expectedCrossOrigin: 'Anonymous',
                name: 'Allow CORS',
                inputOptions: {
                    allowCrossOriginResourceSharing: true,
                },
            },
            {
                expectedCrossOrigin: undefined,
                name: 'Do not allow CORS',
                inputOptions: {
                    allowCrossOriginResourceSharing: false,
                },
            },
        ];

        scenarios.forEach((scenario) => {
            const file = new File([1234], chance.string());
            let image;


            let expectedUrl;


            let actualImageSource;

            describe(scenario.name, () => {
                beforeAll(async () => {
                    const map = {};
                    image = {
                        addEventListener: jest.fn((event, cb) => {
                            map[event] = cb;
                        }),
                    };
                    window.Image = jest.fn(() => image);
                    expectedUrl = chance.url();
                    global.URL.createObjectURL = jest.fn();
                    global.URL.createObjectURL.mockImplementation(() => {
                        map.load();
                        return expectedUrl;
                    });

                    actualImageSource = await imageService.create(file, scenario.inputOptions);
                });

                afterAll(() => {
                    jest.clearAllMocks();
                });

                it('should create an image', () => {
                    expect(window.Image).toHaveBeenCalledTimes(1);
                    expect(window.Image).toHaveBeenCalledWith();
                });

                it('should fire onload on load of image source', () => {
                    expect(image.addEventListener).toHaveBeenCalledTimes(2);
                    expect(image.addEventListener).toHaveBeenCalledWith(
                        'load', expect.any(Function));
                });

                it(`should handle CORS`, () => {
                    expect(image.crossOrigin).toBe(scenario.expectedCrossOrigin);
                });

                it('should have called URL createObjectURL', () => {
                    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
                    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
                });

                it('should return correct url', () => {
                    expect(image.src).toBe(expectedUrl);
                });

                it('should return image source from file reader', () => {
                    expect(actualImageSource).toEqual(image);
                });
            });
        });
    });

    describe('sad path', () => {
        const file = new File([1234], chance.string());
        let image;


        let expectedError;


        let actualError;

        describe('should reject', () => {
            beforeAll(async () => {
                const map = {};
                image = {
                    addEventListener: jest.fn((event, cb) => {
                        map[event] = cb;
                    }),
                };
                window.Image = jest.fn(() => image);
                global.URL.createObjectURL = jest.fn();
                expectedError = chance.string();
                global.URL.createObjectURL.mockImplementation(() => {
                    map.error(expectedError);
                });

                try {
                    await imageService.create(file, {});
                } catch (error) {
                    actualError = error;
                }
            });

            it('should fire onload on load of image source', () => {
                expect(image.addEventListener).toHaveBeenCalledTimes(2);
                expect(image.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
            });

            it('should return error', () => {
                expect(actualError).toEqual(expectedError);
            });
        });
    });
});
