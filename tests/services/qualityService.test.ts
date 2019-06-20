import {Chance} from 'chance';

import fileService from '../../src/services/fileService';
import qualityService from '../../src/services/qualityService';
import windowService from '../../src/services/windowService';

jest.mock('../../src/services/windowService');
jest.mock('../../src/services/fileService');

const chance = new Chance();

describe('qualityService', () => {
    const base64Prefix = chance.string();
    const base64Suffix = chance.string();
    const base64 = `${base64Prefix},${base64Suffix}`;
    const bytes = Uint8Array.from([chance.integer()]);
    let actualBlob: File;

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

    scenarios.forEach((scenario: {
        expectedFile: File,
        file: File,
        inputOptions: {},
        name: string,
        quality: number,
    }) => {
        describe(scenario.name, () => {
            const canvas = document.createElement('canvas');

            beforeAll(() => {
                canvas.toDataURL = jest.fn(() => base64);
                windowService.toByteArray = jest.fn().mockReturnValue(bytes);
                fileService.create = jest.fn(() => scenario.expectedFile);

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
                expect(fileService.create).toHaveBeenCalledTimes(1);
                expect(fileService.create).toHaveBeenCalledWith(
                    bytes, 'image/jpeg', scenario.file.name);
            });

            it('should return a compressed file', () => {
                expect(actualBlob.size).toBe(scenario.expectedFile.size);
            });
        });
    });
});
