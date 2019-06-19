import {Chance} from 'chance';

import blobService from '../../src/services/blobService';

const chance = new Chance();

describe('blobService', () => {
    describe('create', () => {
        const bytes =  Uint8Array.from([chance.integer()]);
        const type = 'image/jpeg';
        const name = chance.string();
        let actualFile: File;

        beforeAll(() => {
            actualFile = blobService.create([bytes], type, name);
        });

        it('should create a blob with size', () => {
            expect(actualFile.size).toBe(bytes.toString().length);
        });

        it('should create a blob with type', () => {
            expect(actualFile.type).toBe('image/jpeg');
        });

        it('should create a blob with name', () => {
            expect(actualFile.name).toBe(name);
        });
    });
});
