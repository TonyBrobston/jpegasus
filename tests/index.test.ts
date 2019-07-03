import {Chance} from 'chance';

import {compress} from '../src/index';
import fileService from '../src/services/fileService';
import qualityService from '../src/services/qualityService';
import scaleService from '../src/services/scaleService';

jest.mock('../src/services/fileService');
jest.mock('../src/services/scaleService');
jest.mock('../src/services/qualityService');

const chance = new Chance();

describe('index', () => {
    describe(`happy path`, () => {
        let actualCompressedFile: File|Blob;

        const file = new File([chance.string()], chance.string(), {
            type: 'image/jpeg',
        });
        const expectedCompressedBlob = new File([chance.string()], chance.string());
        const inputOptions = {
            allowCrossOriginResourceSharing: true,
            maxHeight: 1000,
            maxWidth: 1000,
            quality: 0.05,
            returnOriginalOnFailure: true,
            scaleImageBy: 1.00,
        };
        const canvas = document.createElement('canvas');
        fileService.validate = jest.fn(() => true);
        scaleService.toCanvas = jest.fn(() => Promise.resolve(canvas));
        qualityService.toFile = jest.fn(() => expectedCompressedBlob);

        beforeAll(async () => {
            actualCompressedFile = await compress(file, inputOptions);
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('should convert file to canvasService and scale', async () => {
            expect(scaleService.toCanvas).toHaveBeenCalledTimes(1);
            expect(scaleService.toCanvas).toHaveBeenCalledWith(file, inputOptions);
        });

        it('should convert file to file and reduce quality', () => {
            expect(qualityService.toFile).toHaveBeenCalledTimes(1);
            expect(qualityService.toFile).toHaveBeenCalledWith(file, canvas, inputOptions);
        });

        it('should return a compressed file', () => {
            expect(actualCompressedFile).toEqual(expectedCompressedBlob);
        });
    });

    describe('sad path', () => {
        it('is invalid file', async () => {
            const expectedFile = new File([chance.string()], chance.string());
            fileService.validate = jest.fn(() => false);

            const actualFile = await compress(expectedFile);

            expect(actualFile).toBe(expectedFile);
        });

        it('something throws and return original on failure', async () => {
            const expectedFile = new File([chance.string()], chance.string(), {
                type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`,
            });

            fileService.validate = jest.fn(() => {
                throw new Error();
            });

            const actualFile = await compress(expectedFile, {
                returnOriginalOnFailure: true,
            });

            expect(actualFile).toBe(expectedFile);
        });

        it('something throws and rethrow', async () => {
            const expectedFile = new File([chance.string()], chance.string(), {
                type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`,
            });
            const errorMessage = chance.string();

            fileService.validate = jest.fn(() => {
                throw new Error(errorMessage);
            });

            await expect(compress(expectedFile, {
                returnOriginalOnFailure: false,
            })).rejects.toThrow();
        });

        it('something throws and rethrow with message', async () => {
            const expectedFile = new File([chance.string()], chance.string(), {
                type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`,
            });
            const errorMessage = chance.string();

            fileService.validate = jest.fn(() => {
                throw new Error(errorMessage);
            });

            try {
                await compress(expectedFile, {
                    returnOriginalOnFailure: false,
                });
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }
        });
    });
});
