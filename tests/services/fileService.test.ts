import {Chance} from 'chance';

import fileService from '../../src/services/fileService';

const chance = new Chance();

describe('scenarios', () => {
    const scenarios = [
        {
            expectedOptions: true,
            file: new File([chance.natural()], chance.string(), {
                type: 'image/jpeg',
            }),
            scenario: 'file is valid jpeg',
        },
        {
            expectedOptions: true,
            file: new File([chance.natural()], chance.string(), {
                type: 'image/gif',
            }),
            scenario: 'file is valid gif',
        },
        {
            expectedOptions: true,
            file: new File([chance.natural()], chance.string(), {
                type: 'image/png',
            }),
            scenario: 'file is valid gpng',
        },
        {
            expectedOptions: false,
            file: chance.string(),
            scenario: 'file of string',
        },
        {
            expectedOptions: false,
            file: new File([], chance.string()),
            scenario: 'file with no size',
        },
        {
            expectedOptions: false,
            file: {},
            scenario: 'file of empty object',
        },
        {
            expectedOptions: false,
            file: undefined,
            scenario: 'file of undefined',
        },
        {
            expectedOptions: false,
            file: null,
            scenario: 'file of null',
        },
        {
            expectedOptions: false,
            file: {
                size: chance.natural(),
                type: chance.string(),
            },
            scenario: 'a File that\'s type does not start with image',
        },
        {
            expectedOptions: false,
            file: {
                size: chance.natural(),
                type: 'image/tiff',
            },
            scenario: 'a File that\'s type is image/tiff',
        },
    ];

    scenarios.forEach((scenario) => {
        it(`should not allow ${scenario.scenario}`, () => {
            const isValid = fileService.validate(scenario.file);

            expect(isValid).toBe(scenario.expectedOptions);
        });
    });
});
