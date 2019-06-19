import {Chance} from 'chance';
import imageService from '../../src/services/imageService';

const chance = new Chance();

describe('imageService', () => {
    const globalAny: any = global;
    const windowAny: any = global;

    describe('happy path', () => {
        const scenarios = [
            {
                expectedCrossOrigin: 'Anonymous',
                inputOptions: {
                    allowCrossOriginResourceSharing: true,
                },
                name: 'Allow CORS',
            },
            {
                expectedCrossOrigin: '',
                inputOptions: {
                    allowCrossOriginResourceSharing: false,
                },
                name: 'Do not allow CORS',
            },
        ];

        scenarios.forEach((scenario: any) => {
            const file = new File([chance.string()], chance.string());
            let image: HTMLImageElement,
                expectedUrl: string,
                actualImageSource: HTMLImageElement;

            describe(scenario.name, () => {
                beforeAll(async () => {
                    const map = {};
                    image = document.createElement('img');
                    image.addEventListener = jest.fn(
                        (event: string, listener: EventListenerOrEventListenerObject): void => {
                            // @ts-ignore
                            map[event] = listener;
                        },
                    );
                    windowAny.Image = jest.fn(() => image);
                    expectedUrl = chance.url();
                    globalAny.URL.createObjectURL = jest.fn();
                    globalAny.URL.createObjectURL = jest.fn(() => {
                        // @ts-ignore
                        map.load();
                        return expectedUrl;
                    });

                    actualImageSource = await imageService.create(file, scenario.inputOptions);
                });

                afterAll(() => {
                    jest.clearAllMocks();
                });

                it('should create an image', () => {
                    expect(windowAny.Image).toHaveBeenCalledTimes(1);
                    expect(windowAny.Image).toHaveBeenCalledWith();
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
                    expect(globalAny.URL.createObjectURL).toHaveBeenCalledTimes(1);
                    expect(globalAny.URL.createObjectURL).toHaveBeenCalledWith(file);
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
        const file = new File([chance.string()], chance.string());
        let image: HTMLImageElement,
            expectedError: string,
            actualError: any;

        describe('should reject', () => {
            beforeAll(async () => {
                const map = {};
                image = document.createElement('img');
                image.addEventListener = jest.fn(
                    (event: string, listener: EventListenerOrEventListenerObject): void => {
                        // @ts-ignore
                        map[event] = listener;
                    },
                );
                windowAny.Image = jest.fn(() => image);
                globalAny.URL.createObjectURL = jest.fn();
                expectedError = chance.string();
                globalAny.URL.createObjectURL = jest.fn(() => {
                    // @ts-ignore
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
