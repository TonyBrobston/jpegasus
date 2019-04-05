import {Chance} from 'chance';

import fileService from '../src/services/fileService';
import optionService from '../src/services/optionService';
import scaleService from '../src/services/scaleService';
import qualityService from '../src/services/qualityService';
import {compress} from '../src/index';

jest.mock('../src/services/fileService');
jest.mock('../src/services/optionService');
jest.mock('../src/services/scaleService');
jest.mock('../src/services/qualityService');

const chance = new Chance();

describe('index', () => {
    describe(`happy path`, () => {
        let actualCompressedFile;

        const file = new File([chance.string()], chance.string(), {
            type: 'image/jpeg',
        });
        const expectedCompressedBlob = new File([chance.string()], chance.string());
        const inputOptions = {};
        const options = {
            allowCrossOriginResourceSharing: true,
            quality: 0.05,
            maxHeight: 1000,
            maxWidth: 1000,
        };
        const canvas = document.createElement('canvas');
        fileService.validate = jest.fn(() => true);
        optionService.override = jest.fn(() => options);
        scaleService.toCanvas = jest.fn(() => Promise.resolve(canvas));
        qualityService.toFile = jest.fn(() => expectedCompressedBlob);

        beforeAll(async () => {
            actualCompressedFile = await compress(file, inputOptions);
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('should override default inputOptions', () => {
            expect(optionService.override).toHaveBeenCalledTimes(1);
            expect(optionService.override).toHaveBeenCalledWith(inputOptions);
        });

        it('should convert file to canvasService and scale', async () => {
            expect(scaleService.toCanvas).toHaveBeenCalledTimes(1);
            expect(scaleService.toCanvas).toHaveBeenCalledWith(file, options);
        });

        it('should convert file to file and reduce quality', () => {
            expect(qualityService.toFile).toHaveBeenCalledTimes(1);
            expect(qualityService.toFile).toHaveBeenCalledWith(file, canvas, options);
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

        it('something throws', async () => {
            const expectedFile = new File([chance.string()], chance.string(), {
                type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`,
            });

            fileService.validate = jest.fn(() => {
                throw new Error();
            });

            const actualFile = await compress(expectedFile);

            expect(actualFile).toBe(expectedFile);
        });
    });
});
