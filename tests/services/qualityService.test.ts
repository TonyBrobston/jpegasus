import {Chance} from 'chance';

import fileService from '../../src/services/fileService';
import optionService from '../../src/services/optionService';
import qualityService from '../../src/services/qualityService';
import windowService from '../../src/services/windowService';
import {InputOptions} from '../../src/types/InputOptions';
import {Options} from '../../src/types/Options';

jest.mock('../../src/services/windowService');
jest.mock('../../src/services/fileService');

const chance = new Chance();

describe('qualityService', (): void => {
    const base64Prefix = chance.string();
    const base64Suffix = chance.string();
    const base64 = `${base64Prefix},${base64Suffix}`;
    const bytes = Uint8Array.from([chance.integer()]);
    let actualBlob: File|Blob;

    const scenarios = [
        {
            expectedFile: new File(['a'], chance.string()),
            file: new File([], chance.string()),
            inputOptions: {} as InputOptions,
            name: 'no inputOptions',
            quality: 0.50,
        },
        {
            expectedFile: new File(['a'], chance.string()),
            file: new File([], chance.string()),
            inputOptions: {
                quality: 0.75,
            } as InputOptions,
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
    }): void => {
        describe(scenario.name, (): void => {
            const canvas = document.createElement('canvas');

            beforeAll((): void => {
                canvas.toDataURL = jest.fn((): string => base64);
                windowService.toByteArray = jest.fn().mockReturnValue(bytes);
                fileService.create = jest.fn((): File => scenario.expectedFile);

                actualBlob = qualityService.toFile(scenario.file, canvas,
                    optionService.override(scenario.inputOptions));
            });

            afterAll((): void => {
                jest.clearAllMocks();
            });

            it('should convert canvas to data url', (): void => {
                expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
                expect(canvas.toDataURL).toHaveBeenCalledWith('image/jpeg', scenario.quality);
            });

            it('should convert imageCanvas base64 to bytes', (): void => {
                expect(windowService.toByteArray).toHaveBeenCalledTimes(1);
                expect(windowService.toByteArray).toHaveBeenCalledWith(base64Suffix);
            });

            it('should create a new blob', (): void => {
                expect(fileService.create).toHaveBeenCalledTimes(1);
                expect(fileService.create).toHaveBeenCalledWith(
                    bytes, 'image/jpeg', scenario.file.name);
            });

            it('should return a compressed file', (): void => {
                expect(actualBlob.size).toBe(scenario.expectedFile.size);
            });
        });
    });

    it('should preserve file type', (): void => {
        const type = `image/${chance.pickone(['gif', 'png'])}`;
        const file = new File(['a'], chance.string(), {type});
        const canvas = document.createElement('canvas');
        const quality = 1.00;
        const options = {
            preserveFileType: true,
            quality,
        } as Options;

        qualityService.toFile(file, canvas, options);

        expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
        expect(canvas.toDataURL).toHaveBeenCalledWith(type, quality);

        expect(fileService.create).toHaveBeenCalledTimes(1);
        expect(fileService.create).toHaveBeenCalledWith(bytes, type, file.name);
    });
});
