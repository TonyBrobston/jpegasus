import EXIF from 'exif-js';
import Chance from 'chance';

import fileService from '../../../src/services/elements/fileService';

const chance = new Chance();

jest.mock('exif-js');

describe('fileService', () => {
    describe('create', () => {
        const blob = {};
        const filename = chance.string();
        const expectedFile = blob;

        expectedFile.lastModifiedDate = chance.date();
        expectedFile.name = filename;

        let actualFile;

        beforeAll(() => {
            actualFile = fileService.create(blob, filename);
        });

        it('should create a file', () => {
            expect(Date.parse(actualFile.lastModifiedDate)).not.toBe(NaN);
            expectedFile.lastModifiedDate = actualFile.lastModifiedDate;
            expect(actualFile).toEqual(expectedFile);
        });
    });

    describe('getOrientation', () => {
        const blob = new Blob();
        const filename = chance.string();
        const expectedFile = blob;

        let exifOrientation,
            imageOnload = null;

        expectedFile.lastModifiedDate = chance.date();
        expectedFile.name = filename;
        global.URL.createObjectURL = jest.fn();
        global.URL.createObjectURL.mockReturnValue(chance.url());

        Object.defineProperty(Image.prototype, 'onload', {
            get() {
                return this._onload;
            },
            set(fn) {
                imageOnload = fn;
                this._onload = fn;
            }
        });

        beforeEach(() => {
            exifOrientation = chance.integer();

            EXIF.getTag.mockReturnValue(exifOrientation);

            EXIF.getData.mockImplementation((_, cb) => {
                cb();
            });
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should call EXIF getData', async () => {
            fileService.getOrientation(expectedFile);
            imageOnload();

            expect(EXIF.getData).toHaveBeenCalledTimes(1);
        });

        it('should call EXIF getTag', async () => {
            fileService.getOrientation(expectedFile);
            imageOnload();

            expect(EXIF.getTag).toHaveBeenCalledTimes(1);
            expect(EXIF.getTag).toHaveBeenCalledWith(undefined, 'Orientation');
        });

        it('should return orientation', async () => {
            const promise = fileService.getOrientation(expectedFile);

            imageOnload();

            expect(promise).resolves.toBe(exifOrientation);
        });
    });
});
