import Chance from 'chance';

import blobService from '../../src/services/blobService';

const chance = new Chance();

describe('blobService', () => {
    describe('create', () => {
        const byte = chance.natural();
        const byteArray = [byte];
        const type = 'image/jpeg';
        const name = chance.string();
        const date = new Date();
        let actualBlob;

        beforeAll(() => {
            global.Date = jest.fn(() => date);

            actualBlob = blobService.create(byteArray, type, name);
        });

        it('should create a blob with size', () => {
            expect(actualBlob.size).toBe(byte.toString().length);
        });

        it('should create a blob with type', () => {
            expect(actualBlob.type).toBe('image/jpeg');
        });

        it('should create a blob with lastModifiedDate', () => {
            expect(actualBlob.lastModifiedDate).toBe(date);
        });

        it('should create a blob with name', () => {
            expect(actualBlob.name).toBe(name);
        });
    });
});
