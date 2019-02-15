import comparisonService from '../../src/services/comparisonService';

describe('comparisonService', () => {
    const scenarios = [
        {
            blob: {
                size: 1,
            },
            expected: {
                size: 1,
            },
            file: {
                size: 2,
            },
            name: 'should return compressed blob',
        },
        {
            blob: {
                size: 2,
            },
            expected: {
                size: 1,
            },
            file: {
                size: 1,
            },
            name: 'should return original file',
        },
    ];

    scenarios.forEach((scenario) => {
        it(scenario.name, () => {
            const actual = comparisonService.pickSmaller(scenario.blob, scenario.file);

            expect(actual).toEqual(scenario.expected);
        });
    });
});
