import optionService from '../../src/services/optionService';

describe('optionService', () => {
    const scenarios = [
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: false,
                quality: 0.5,
                returnOriginalOnFailure: true,
            },
            inputOptions: {},
            name: 'should not override any inputOptions',
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                returnOriginalOnFailure: false,
            },
            inputOptions: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                returnOriginalOnFailure: false,
            },
            name: 'should override all inputOptions',
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                quality: 0.5,
                returnOriginalOnFailure: true,
            },
            inputOptions: {
                allowCrossOriginResourceSharing: true,
            },
            name: 'should override only allowCrossOriginResourceSharing',
        },
    ];

    scenarios.forEach((scenario: {
        expectedOptions: {},
        inputOptions: {},
        name: string,
    }) => {
        it(scenario.name, () => {
            const mergedOptions = optionService.override(scenario.inputOptions);

            expect(mergedOptions).toEqual(scenario.expectedOptions);
        });
    });
});
