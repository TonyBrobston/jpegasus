import Chance from 'chance';

import index from '../src/index';
import scaleService from '../src/services/sizing/scaleService';
import qualityService from '../src/services/sizing/qualityService';
import fileService from '../src/services/elements/fileService';

jest.mock('../src/services/sizing/scaleService');
jest.mock('../src/services/sizing/qualityService');
jest.mock('../src/services/elements/fileService');

const chance = new Chance();

describe('index', async () => {
    describe('happy path', () => {
        const file = new File([chance.integer({min: 1})], chance.string(), {
            type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`
        });
        const options = undefined;
        const defaultOptions = {
            allowCrossOriginResourceSharing: false,
            maxHeight: 16250,
            maxWidth: 16250,
            quality: 0.5
        };
        const canvas = chance.string();
        const expectedCompressedFile = new File([chance.integer({min: 0})], chance.string());
        let actualCompressedFile,
            exifOrientation;

        scaleService.toCanvas.mockResolvedValue(canvas);
        qualityService.toFile.mockReturnValue(expectedCompressedFile);

        beforeAll(async () => {
            exifOrientation = chance.integer();
            fileService.getOrientation.mockResolvedValue(exifOrientation);
            actualCompressedFile = await index.compress(file, options, exifOrientation);
        });

        it('should convert file to canvasService and scale', async () => {
            expect(scaleService.toCanvas).toHaveBeenCalledTimes(1);
            expect(scaleService.toCanvas).toHaveBeenCalledWith(file, defaultOptions, exifOrientation);
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
        const sadPaths = [
            {
                file: chance.string(),
                scenario: 'file of string'
            },
            {
                file: new File([], chance.string()),
                scenario: 'file with no size'
            },
            {
                file: {},
                scenario: 'file of empty object'
            },
            {
                file: undefined,
                scenario: 'file of undefined'
            },
            {
                file: null,
                scenario: 'file of null'
            },
            {
                file: {
                    size: chance.integer({min: 1}),
                    type: chance.string()
                },
                scenario: 'a File that\'s type does not start with image'
            }
        ];

        sadPaths.forEach((sadPath) => {
            it(`should not allow ${sadPath.scenario}`, async () => {
                const compressedFile = await index.compress(sadPath.file);

                expect(compressedFile).toBe(sadPath.file);
            });
        });
    });
});
