import Chance from 'chance';

import index from '../src/index';
import scaleService from '../src/services/sizing/scaleService';
import qualityService from '../src/services/sizing/qualityService';

jest.mock('../src/services/sizing/scaleService');
jest.mock('../src/services/sizing/qualityService');

const chance = new Chance();

describe('index', async () => {
    describe('happy path', () => {
        const file = new File([chance.integer({min: 1})], chance.string(), {
            type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`
        });
        const options = undefined;
        const defaultOptions = {
            maxHeight: 16250,
            maxWidth: 16250,
            quality: 0.5
        };
        const canvas = chance.string();
        const expectedCompressedFile = new File([chance.integer({min: 0})], chance.string());
        let actualCompressedFile;

        scaleService.toCanvas.mockResolvedValue(canvas);
        qualityService.toFile.mockReturnValue(expectedCompressedFile);

        beforeAll(async () => {
            actualCompressedFile = await index.compress(file, options);
        });

        it('should convert file to canvasService and scale', async () => {
            expect(scaleService.toCanvas).toHaveBeenCalledTimes(1);
            expect(scaleService.toCanvas).toHaveBeenCalledWith(file, defaultOptions);
        });

        it('should convert file to file and reduce quality', () => {
            expect(qualityService.toFile).toHaveBeenCalledTimes(1);
            expect(qualityService.toFile).toHaveBeenCalledWith(file, canvas, defaultOptions);
        });

        it('should return a compressed file', () => {
            expect(actualCompressedFile).toBe(expectedCompressedFile);
        });
    });

    describe('sad path', () => {
        it('should not allow file of string', async () => {
            const file = chance.string();

            const compressedFile = await index.compress(file);

            expect(compressedFile).toBe(file);
        });

        it('should not File with no size', async () => {
            const file = new File([], chance.string());

            const compressedFile = await index.compress(file);

            expect(compressedFile).toBe(file);
        });

        it('should not allow an empty object', async () => {
            const file = {};

            const compressedFile = await index.compress(file);

            expect(compressedFile).toBe(file);
        });


        it('should not allow a File that\'s type does not start with image/' , async () => {
            const file = {
                size: chance.integer({min: 1}),
                type: chance.string()
            };

            const compressedFile = await index.compress(file);

            expect(compressedFile).toBe(file);
        });
    });
});
