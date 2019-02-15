import optionService from '../../../src/services/config/optionService';

describe('optionService', () => {
    const scenarios = [
        {
            expected: {
                allowCrossOriginResourceSharing: false,
                maxHeight: 16250,
                maxWidth: 16250,
                quality: 0.5,
                readImageFileTimeout: 5000,
            },
            name: 'should not override any options',
            options: {},
        },
        {
            expected: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                readImageFileTimeout: 2500,
            },
            name: 'should override all options',
            options: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                readImageFileTimeout: 2500,
            },
        },
        {
            expected: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 16250,
                maxWidth: 16250,
                quality: 0.5,
                readImageFileTimeout: 5000,
            },
            name: 'should override only allowCrossOriginResourceSharing',
            options: {
                allowCrossOriginResourceSharing: true,
            },
        },
    ];

    scenarios.forEach((scenario) => {
        it(scenario.name, () => {
            const mergedOptions = optionService.override(scenario.options);

            expect(mergedOptions).toEqual(scenario.expected);
        });
    });
});
