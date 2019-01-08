import Chance from 'chance';

import fileService from '../../../src/services/elements/fileService';

const chance = new Chance();

describe('fileService', () => {
    const blob = chance.string();
    const filename = chance.string();
    const expectedFile = {
        ...blob,
        lastModifiedDate: new Date(),
        name: filename
    };
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
