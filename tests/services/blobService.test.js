import Chance from 'chance';

import blobService from '../../src/services/blobService';

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
            actualBlob = blobService.addMetadata(file, filename);
        });

        it('should addMetadata a blob', () => {
            expect(Date.parse(actualBlob.lastModifiedDate)).not.toBe(NaN);
            expectedBlob.lastModifiedDate = actualBlob.lastModifiedDate;
            expect(actualBlob).toEqual(expectedBlob);
        });
    });
});
