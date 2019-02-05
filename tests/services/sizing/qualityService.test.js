import Chance from 'chance';
import base64toblob from 'base64toblob';

import qualityService from '../../../src/services/sizing/qualityService';
import fileService from '../../../src/services/formats/blobService';

jest.mock('base64toblob');
jest.mock('../../../src/services/formats/blobService');

const chance = new Chance();

describe('qualityService', () => {
    const base64Prefix = chance.string();
    const base64Suffix = chance.string();
    const base64 = `${base64Prefix},${base64Suffix}`;
    const blob = chance.string();
    let actualFile;

    const scenarios = [
        {
            createdFile: {
                size: 100
            },
            expectedFile: {
                size: 100
            },
            file: {
                name: chance.string(),
                size: 100
            },
            name: 'no options',
            options: {},
            quality: 1.00
        },
        {
            createdFile: {
                size: 75
            },
            expectedFile: {
                size: 75
            },
            file: {
                name: chance.string(),
                size: 100
            },
            name: 'quality overrides targetFileSize',
            options: {
                quality: 0.75,
                targetFileSize: 10
            },
            quality: 0.75
        },
        {
            createdFile: {
                size: 10
            },
            expectedFile: {
                size: 10
            },
            file: {
                name: chance.string(),
                size: 100
            },
            name: 'targetFileSize < file.size',
            options: {
                targetFileSize: 10
            },
            quality: 0.10
        },
        {
            createdFile: {
                size: 10
            },
            expectedFile: {
                size: 10
            },
            file: {
                name: chance.string(),
                size: 10
            },
            name: 'file.size < targetFileSize',
            options: {
                targetFileSize: 100
            },
            quality: 1.00
        }
    ];

    scenarios.forEach((scenario) => {
        describe(scenario.name, () => {
            const canvas = {
                toDataURL: jest.fn(),
            };

            beforeAll(() => {
                canvas.toDataURL.mockReturnValue(base64);
                base64toblob.mockReturnValue(blob);
                fileService.create.mockReturnValue(scenario.createdFile);

                actualFile = qualityService.toFile(scenario.file, canvas, scenario.options);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should convert canvas to data url', () => {
                expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
                expect(canvas.toDataURL).toHaveBeenCalledWith('image/jpeg', scenario.quality);
            });

            it('should convert imageCanvas base64 to blob', () => {
                expect(base64toblob).toHaveBeenCalledTimes(1);
                expect(base64toblob).toHaveBeenCalledWith(base64Suffix, 'image/jpeg');
            });

            it('should create a new file', () => {
                expect(fileService.create).toHaveBeenCalledTimes(1);
                expect(fileService.create).toHaveBeenCalledWith(blob, scenario.file.name);
            });

            it('should return a compressed file', () => {
                expect(actualFile.size).toBe(scenario.expectedFile.size);
            });
        });
    });
});
