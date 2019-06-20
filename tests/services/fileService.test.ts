import {Chance} from 'chance';

import fileService from '../../src/services/fileService';

const chance = new Chance();

describe('scenarios', () => {
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
