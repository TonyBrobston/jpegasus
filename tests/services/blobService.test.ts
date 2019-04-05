import {Chance} from 'chance';

import blobService from '../../src/services/blobService';

const chance = new Chance();

describe('blobService', () => {
    describe('create', () => {
        const byte = chance.string();
        const byteArray = [byte];
        const type = 'image/jpeg';
        const name = chance.string();
        let actualFile;

        beforeAll(() => {
            actualFile = blobService.create(byteArray, type, name);
        });

        it('should create a blob with size', () => {
            expect(actualFile.size).toBe(byte.toString().length);
        });

        it('should create a blob with type', () => {
            expect(actualFile.type).toBe('image/jpeg');
        });

        it('should create a blob with name', () => {
            expect(actualFile.name).toBe(name);
        });
    });
});
