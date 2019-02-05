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
        let fileReader,
            image,
            actualImageSource;

        describe(scenario.name, () => {
            beforeAll(async () => {
                fileReader = {
                    addEventListener: jest.fn((_, evtHandler) => { evtHandler(); }),
                    readAsDataURL: jest.fn(),
                    result: chance.string
                };
                image = {
                    addEventListener: jest.fn((_, evtHandler) => { evtHandler(); })
                };
                window.FileReader = jest.fn(() => fileReader);
                window.Image = jest.fn(() => image);

                actualImageSource = await imageService.create(file, scenario.options);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should create file reader', async () => {
                expect(window.FileReader).toHaveBeenCalledTimes(1);
                expect(window.FileReader).toHaveBeenCalledWith();
            });

            it('should fire file loader onload of file reader', () => {
                expect(fileReader.addEventListener).toHaveBeenCalledTimes(1);
                expect(fileReader.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
            });

            it('should fire read as data url on read of file reader', () => {
                expect(fileReader.readAsDataURL).toHaveBeenCalledTimes(1);
                expect(fileReader.readAsDataURL).toHaveBeenCalledWith(file);
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

            it('should have image source from file reader result', () => {
                expect(image.src).toBe(fileReader.result);
            })
        });
    });
});
