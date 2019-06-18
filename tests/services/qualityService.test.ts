import {Chance} from 'chance';

import blobService from '../../src/services/blobService';
import qualityService from '../../src/services/qualityService';
import windowService from '../../src/services/windowService';

jest.mock('../../src/services/windowService');
jest.mock('../../src/services/blobService');

const chance = new Chance();

describe('qualityService', () => {
    const base64Prefix = chance.string();
    const base64Suffix = chance.string();
    const base64 = `${base64Prefix},${base64Suffix}`;
    const bytes = Blob[chance.string()];
    let actualBlob;

    const scenarios = [
        {
            expectedFile: new File(['a'], chance.string()),
            file: new File([], chance.string()),
            inputOptions: {},
            name: 'no inputOptions',
            quality: 1.00,
        },
        {
            expectedFile: new File(['a'], chance.string()),
            file: new File([], chance.string()),
            inputOptions: {
                quality: 0.75,
            },
            name: 'quality overrides default',
            quality: 0.75,
        },
    ];

    scenarios.forEach((scenario: object) => {
        describe(scenario.name, () => {
            const canvas = document.createElement('canvas');

            beforeAll(() => {
                canvas.toDataURL = jest.fn(() => base64);
                windowService.toByteArray = jest.fn(() => bytes);
                blobService.create = jest.fn(() => scenario.expectedFile);

                actualBlob = qualityService.toFile(scenario.file, canvas, scenario.inputOptions);
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
