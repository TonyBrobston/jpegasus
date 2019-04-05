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
            scenario: 'file is valid jpeg',
        },
        {
            expectedOptions: true,
            file: new File([chance.string()], chance.string(), {
                type: 'image/gif',
            }),
            scenario: 'file is valid gif',
        },
        {
            expectedOptions: true,
            file: new File([chance.string()], chance.string(), {
                type: 'image/png',
            }),
            scenario: 'file is valid gpng',
        },
        {
            expectedOptions: false,
            file: new File([], chance.string()),
            scenario: 'file with no size',
        },
        {
            expectedOptions: false,
            file: new File([chance.string()], chance.string(), {
                type: chance.string(),
            }),
            scenario: 'a File that\'s type does not start with image',
        },
        {
            expectedOptions: false,
            file: new File([chance.string()], chance.string(), {
                type: 'image/tiff',
            }),
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
