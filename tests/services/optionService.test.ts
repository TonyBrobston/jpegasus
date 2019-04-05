import optionService from '../../src/services/optionService';

describe('optionService', () => {
    const scenarios = [
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: false,
                quality: 0.5,
                readImageFileTimeout: 5000,
            },
            name: 'should not override any inputOptions',
            inputOptions: {},
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                readImageFileTimeout: 2500,
            },
            name: 'should override all inputOptions',
            inputOptions: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                readImageFileTimeout: 2500,
            },
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                quality: 0.5,
                readImageFileTimeout: 5000,
            },
            name: 'should override only allowCrossOriginResourceSharing',
            inputOptions: {
                allowCrossOriginResourceSharing: true,
            },
        },
    ];

    scenarios.forEach((scenario) => {
        it(scenario.name, () => {
            const mergedOptions = optionService.override(scenario.inputOptions);

            expect(mergedOptions).toEqual(scenario.expectedOptions);
        });
    });
});
