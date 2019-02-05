import Chance from 'chance';

import blobService from '../../../src/services/formats/blobService';

const chance = new Chance();

describe('blobService', () => {
    describe('create', () => {
        const file = {};
        const filename = chance.string();
        const expectedBlob = file;

        expectedBlob.lastModifiedDate = chance.date();
        expectedBlob.name = filename;

        let actualBlob;

        beforeAll(() => {
            actualBlob = blobService.create(file, filename);
        });

        it('should create a blob', () => {
            expect(Date.parse(actualBlob.lastModifiedDate)).not.toBe(NaN);
            expectedBlob.lastModifiedDate = actualBlob.lastModifiedDate;
            expect(actualBlob).toEqual(expectedBlob);
        });
    });
});
