import {Chance} from 'chance';

import fileService from '../../src/services/fileService';

const chance = new Chance();

describe('fileService', () => {
    describe('validate', () => {
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
        }) => {
            it(`should not allow ${scenario.name}`, () => {
                const isValid = fileService.validate(scenario.file);

                expect(isValid).toBe(scenario.expectedOptions);
            });
        });
    });

    describe('create', () => {
        const bytes =  Uint8Array.from([chance.integer()]);
        const type = 'image/jpeg';
        const name = chance.string();
        let actualFile: File;

        beforeAll(() => {
            actualFile = fileService.create([bytes], type, name);
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
