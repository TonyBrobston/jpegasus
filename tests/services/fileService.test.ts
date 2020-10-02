import {Chance} from 'chance';

import fileService from '../../src/services/fileService';

const chance = new Chance();

describe('fileService', (): void => {
    const globalAny: any = global;

    describe('validate', (): void => {
        const scenarios = [
            {
                expectedOptions: true,
                file: new File([chance.string()], chance.string(), {
                    type: 'image/jpeg',
                }),
                name: 'file is valid jpeg',
            },
            {
                expectedOptions: true,
                file: new File([chance.string()], chance.string(), {
                    type: 'image/gif',
                }),
                name: 'file is valid gif',
            },
            {
                expectedOptions: true,
                file: new File([chance.string()], chance.string(), {
                    type: 'image/png',
                }),
                name: 'file is valid gpng',
            },
            {
                expectedOptions: false,
                file: new File([], chance.string()),
                name: 'file with no size',
            },
            {
                expectedOptions: false,
                file: new File([chance.string()], chance.string(), {
                    type: chance.string(),
                }),
                name: 'a File that\'s type does not start with image',
            },
            {
                expectedOptions: false,
                file: new File([chance.string()], chance.string(), {
                    type: 'image/tiff',
                }),
                name: 'a File that\'s type is image/tiff',
            },
        ];

        scenarios.forEach((scenario: {
            expectedOptions: boolean,
            file: File,
            name: string,
        }): void => {
            it(`should not allow ${scenario.name}`, (): void => {
                const isValid = fileService.validate(scenario.file);

                expect(isValid).toBe(scenario.expectedOptions);
            });
        });
    });

    describe('create File', (): void => {
        const bytes =  Uint8Array.from([chance.integer()]);
        const type = `image/${chance.pickone(['jpeg', 'gif', 'png'])}`;
        const name = chance.string();
        let actualFile: File|Blob;

        beforeAll((): void => {
            actualFile = fileService.create([bytes], type, name);
        });

        it('should create a file with type File', (): void => {
            expect(actualFile).toBeInstanceOf(File);
        });

        it('should create a file with name', (): void => {
            expect(actualFile.name).toBe(name);
        });

        it('should create a file with size', (): void => {
            expect(actualFile.size).toBe(bytes.toString().length);
        });

        it('should create a file with type', (): void => {
            expect(actualFile.type).toBe(type);
        });
    });

    describe('create Blob', (): void => {
        const bytes =  Uint8Array.from([chance.integer()]);
        const type = `image/${chance.pickone(['jpeg', 'gif', 'png'])}`;
        const name = chance.string();
        let actualBlob: File|Blob;

        beforeAll((): void => {
            globalAny.File = jest.fn().mockImplementation((): void => {
                throw new Error();
            });
            actualBlob = fileService.create([bytes], type, name);
        });

        it('should create a blob with type Blob', (): void => {
            expect(actualBlob).toBeInstanceOf(Blob);
        });

        it('should create a blob with name', (): void => {
            expect(actualBlob.name).toBe(name);
        });

        it('should create a blob with size', (): void => {
            expect(actualBlob.size).toBe(bytes.toString().length);
        });

        it('should create a blob with type', (): void => {
            expect(actualBlob.type).toBe(type);
        });
    });
});
