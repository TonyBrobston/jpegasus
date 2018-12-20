import Chance from 'chance';

import fileService from '../../../src/services/elements/fileService';

const chance = new Chance();

describe('fileService', () => {
    const blob = chance.string();
    const filename = chance.string();
    const expectedFile = new File([blob], filename);
    let actualFile;

    beforeAll(() => {
        actualFile = fileService.create(blob, filename);
    });

    it('should create a file', () => {
        expect(actualFile).toEqual(expectedFile);
    });
});