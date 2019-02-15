import Chance from 'chance';

import fileService from '../../src/services/fileService';

const chance = new Chance();

describe('scenarios', () => {
    const scenarios = [
        {
            expected: true,
            file: new File([chance.natural()], chance.string(), {
                type: 'image/jpeg',
            }),
            scenario: 'file is valid jpeg',
        },
        {
            expected: true,
            file: new File([chance.natural()], chance.string(), {
                type: 'image/gif',
            }),
            scenario: 'file is valid gif',
        },
        {
            expected: true,
            file: new File([chance.natural()], chance.string(), {
                type: 'image/png',
            }),
            scenario: 'file is valid gpng',
        },
        {
            expected: false,
            file: chance.string(),
            scenario: 'file of string',
        },
        {
            expected: false,
            file: new File([], chance.string()),
            scenario: 'file with no size',
        },
        {
            expected: false,
            file: {},
            scenario: 'file of empty object',
        },
        {
            expected: false,
            file: undefined,
            scenario: 'file of undefined',
        },
        {
            expected: false,
            file: null,
            scenario: 'file of null',
        },
        {
            expected: false,
            file: {
                size: chance.natural(),
                type: chance.string(),
            },
            scenario: 'a File that\'s type does not start with image',
        },
        {
            expected: false,
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

            expect(isValid).toBe(scenario.expected);
        });
    });
});
