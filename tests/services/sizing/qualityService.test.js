import Chance from 'chance';
import base64toblob from 'base64toblob';

import qualityService from '../../../src/services/sizing/qualityService';
import fileService from '../../../src/services/elements/fileService';

jest.mock('base64toblob');
jest.mock('../../../src/services/elements/fileService');

const chance = new Chance();

describe('qualityService', () => {
    const base64Prefix = chance.string();
    const base64Suffix = chance.string();
    const base64 = `${base64Prefix},${base64Suffix}`;
    const blob = chance.string();
    const expectedFile = chance.string();
    let actualFile;

    const scenarios = [
        {
            file: {
                name: chance.string(),
                size: 100
            },
            name: 'no options',
            options: {},
            quality: 1
        },
        {
            file: {
                name: chance.string(),
                size: 100
            },
            name: 'targetFileSize < file.size',
            options: {
                targetFileSize: 10
            },
            quality: 0.1
        },
        {
            file: {
                name: chance.string(),
                size: 10
            },
            name: 'file.size < targetFileSize',
            options: {
                targetFileSize: 100
            },
            quality: 1
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
                fileService.create.mockReturnValue(expectedFile);


                actualFile = qualityService.toFile(scenario.file, canvas, scenario.options);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            it('should convert canvasService to data url', () => {
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
                expect(actualFile).toBe(expectedFile);
            });
        });
    });
});