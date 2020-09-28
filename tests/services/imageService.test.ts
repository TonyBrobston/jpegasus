import {Chance} from 'chance';
import imageService from '../../src/services/imageService';
import optionService from '../../src/services/optionService';
import {InputOptions} from '../../src/types/InputOptions';

const chance = new Chance();

describe('imageService', (): void => {
    const globalAny: any = global;

    describe('happy path', (): void => {
        const scenarios = [
            {
                expectedCrossOrigin: 'Anonymous',
                inputOptions: {
                    allowCrossOriginResourceSharing: true,
                } as InputOptions,
                name: 'Allow CORS',
            },
            {
                expectedCrossOrigin: '',
                inputOptions: {
                    allowCrossOriginResourceSharing: false,
                } as InputOptions,
                name: 'Do not allow CORS',
            },
        ];

        scenarios.forEach((scenario: {
            expectedCrossOrigin: string,
            inputOptions: InputOptions,
            name: string,
        }): void => {
            const file = new File([chance.string()], chance.string());
            let image: HTMLImageElement,
                expectedUrl: string,
                actualImageSource: HTMLImageElement;

            describe(scenario.name, (): void => {
                beforeAll(async (): Promise<void> => {
                    const map = new Map();
                    image = document.createElement('img');
                    image.addEventListener = jest.fn(
                        (event: string, listener: EventListenerOrEventListenerObject): void => {
                            map.set(event, listener);
                        },
                    );
                    globalAny.Image = jest.fn((): HTMLImageElement => image);
                    expectedUrl = chance.url();
                    globalAny.URL.createObjectURL = jest.fn();
                    globalAny.URL.createObjectURL = jest.fn((): string => {
                        map.get('load')();
                        return expectedUrl;
                    });

                    actualImageSource = await imageService.create(file, optionService.override(scenario.inputOptions));
                });

                afterAll((): void => {
                    jest.clearAllMocks();
                });

                it('should create an image', (): void => {
                    expect(globalAny.Image).toHaveBeenCalledTimes(1);
                    expect(globalAny.Image).toHaveBeenCalledWith();
                });

                it('should fire onload on load of image source', (): void => {
                    expect(image.addEventListener).toHaveBeenCalledTimes(2);
                    expect(image.addEventListener).toHaveBeenCalledWith(
                        'load', expect.any(Function));
                });

                it(`should handle CORS`, (): void => {
                    expect(image.crossOrigin).toBe(scenario.expectedCrossOrigin);
                });

                it('should have called URL createObjectURL', (): void => {
                    expect(globalAny.URL.createObjectURL).toHaveBeenCalledTimes(1);
                    expect(globalAny.URL.createObjectURL).toHaveBeenCalledWith(file);
                });

                it('should return correct url', (): void => {
                    expect(image.src).toBe(expectedUrl);
                });

                it('should return image source from file reader', (): void => {
                    expect(actualImageSource).toEqual(image);
                });
            });
        });
    });

    describe('sad path', (): void => {
        const file = new File([chance.string()], chance.string());
        let image: HTMLImageElement,
            expectedError: string,
            actualError: string;

        describe('should reject', (): void => {
            beforeAll(async (): Promise<void> => {
                const map = new Map();
                image = document.createElement('img');
                image.addEventListener = jest.fn(
                    (event: string, listener: EventListenerOrEventListenerObject): void => {
                        map.set(event, listener);
                    },
                );
                globalAny.Image = jest.fn((): HTMLImageElement => image);
                globalAny.URL.createObjectURL = jest.fn();
                expectedError = chance.string();
                globalAny.URL.createObjectURL = jest.fn((): void => {
                    map.get('error')(expectedError);
                });

                try {
                    await imageService.create(file, optionService.override({}));
                } catch (error) {
                    actualError = error;
                }
            });

            it('should fire onload on load of image source', (): void => {
                expect(image.addEventListener).toHaveBeenCalledTimes(2);
                expect(image.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
            });

            it('should return error', (): void => {
                expect(actualError).toEqual(expectedError);
            });
        });
    });
});
