import Chance from 'chance';

import index from '../src/index';
import fileService from '../src/services/fileService';
import optionService from '../src/services/optionService';
import scaleService from '../src/services/scaleService';
import qualityService from '../src/services/qualityService';

jest.mock('../src/services/fileService');
jest.mock('../src/services/optionService');
jest.mock('../src/services/scaleService');
jest.mock('../src/services/qualityService');

const chance = new Chance();

describe('index', async () => {
    describe(`happy path`, () => {
        let actualCompressedFile;

        const file = new File([chance.natural()], chance.string(), {
            type: 'image/jpeg',
        });
        const canvas = chance.string();
        const expectedCompressedFile = new File([chance.natural()], chance.string());
        const inputOptions = chance.string();
        const options = chance.string();

        beforeAll(async () => {
            fileService.validate.mockReturnValue(true);
            optionService.override.mockReturnValue(options);
            scaleService.toCanvas.mockResolvedValue(canvas);
            qualityService.toFile.mockReturnValue(expectedCompressedFile);

            actualCompressedFile = await index.compress(file, inputOptions);
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('should override default options', () => {
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
            expect(actualCompressedFile).toBe(expectedCompressedFile);
        });
    });

    describe('sad path', () => {
        it('is invalid file', async () => {
            const expectedFile = chance.string();
            fileService.validate.mockReturnValue(false);

            const actualFile = await index.compress(expectedFile);

            expect(actualFile).toBe(expectedFile);
        });

        it('something throws', async () => {
            const expectedFile = new File([chance.natural()], chance.string(), {
                type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`,
            });

            fileService.validate.mockImplementation(() => {
                throw new Error();
            });

            const actualFile = await index.compress(expectedFile);

            expect(actualFile).toBe(expectedFile);
        });
    });
});
