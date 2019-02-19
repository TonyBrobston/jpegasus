import Chance from 'chance';

import qualityService from '../../src/services/qualityService';
import windowService from '../../src/services/windowService';
import blobService from '../../src/services/blobService';

jest.mock('../../src/services/windowService');
jest.mock('../../src/services/blobService');

const chance = new Chance();

describe('qualityService', () => {
    const base64Prefix = chance.string();
    const base64Suffix = chance.string();
    const base64 = `${base64Prefix},${base64Suffix}`;
    const bytes = chance.string();
    let actualBlob;

    const scenarios = [
        {
            expectedFile: {
                size: 100,
            },
            file: {
                name: chance.string(),
                size: 100,
            },
            name: 'no options',
            options: {},
            quality: 1.00,
        },
        {
            expectedFile: {
                size: 100,
            },
            file: {
                name: chance.string(),
                size: 75,
            },
            name: 'quality overrides targetFileSize',
            options: {
                quality: 0.75,
                targetFileSize: 10,
            },
            quality: 0.75,
        },
        {
            expectedFile: {
                size: 10,
            },
            file: {
                name: chance.string(),
                size: 100,
            },
            name: 'targetFileSize < file.size',
            options: {
                targetFileSize: 10,
            },
            quality: 0.10,
        },
        {
            expectedFile: {
                size: 10,
            },
            file: {
                name: chance.string(),
                size: 10,
            },
            name: 'file.size < targetFileSize',
            options: {
                targetFileSize: 100,
            },
            quality: 1.00,
        },
        {
            expectedFile: {
                size: 1000,
            },
            file: {
                name: chance.string(),
                size: 100,
            },
            name: 'file got bigger',
            options: {
                targetFileSize: 100,
            },
            quality: 1.00,
        },
    ];

    scenarios.forEach((scenario) => {
        describe(scenario.name, () => {
            const canvas = {
                toDataURL: jest.fn(),
            };

            beforeAll(() => {
                canvas.toDataURL.mockReturnValue(base64);
                windowService.toByteArray.mockReturnValue(bytes);
                blobService.create.mockReturnValue(scenario.expectedFile);

                actualBlob = qualityService.toBlob(scenario.file, canvas, scenario.options);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should convert canvas to data url', () => {
                expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
                expect(canvas.toDataURL).toHaveBeenCalledWith('image/jpeg', scenario.quality);
            });

            it('should convert imageCanvas base64 to bytes', () => {
                expect(windowService.toByteArray).toHaveBeenCalledTimes(1);
                expect(windowService.toByteArray).toHaveBeenCalledWith(base64Suffix);
            });

            it('should create a new blob', () => {
                expect(blobService.create).toHaveBeenCalledTimes(1);
                expect(blobService.create).toHaveBeenCalledWith(
                    bytes, 'image/jpeg', scenario.file.name);
            });

            it('should return a compressed file', () => {
                expect(actualBlob.size).toBe(scenario.expectedFile.size);
            });
        });
    });
});
