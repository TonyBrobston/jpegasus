import optionService from '../../src/services/optionService';
import {InputOptions} from '../../src/types/InputOptions';
import {Options} from '../../src/types/Options';

describe('optionService', () => {
    const scenarios = [
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: false,
                quality: 0.5,
                returnOriginalOnFailure: true,
                scaleImageBy: 1.00,
            } as Options,
            inputOptions: {} as InputOptions,
            name: 'should not override any inputOptions',
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                returnOriginalOnFailure: false,
                scaleImageBy: 0.49,
            } as Options,
            inputOptions: {
                allowCrossOriginResourceSharing: true,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                returnOriginalOnFailure: false,
                scaleImageBy: 0.49,
            } as InputOptions,
            name: 'should override all inputOptions',
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                quality: 0.5,
                returnOriginalOnFailure: true,
                scaleImageBy: 1.00,
            } as Options,
            inputOptions: {
                allowCrossOriginResourceSharing: true,
            } as InputOptions,
            name: 'should override only allowCrossOriginResourceSharing',
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: false,
                maxHeight: undefined,
                maxWidth: undefined,
                quality:  0.5,
                returnOriginalOnFailure: true,
                scaleImageBy: 1.00,
            } as Options,
            inputOptions: {
                allowCrossOriginResourceSharing: undefined,
                maxHeight: undefined,
                maxWidth: undefined,
                quality: undefined,
                returnOriginalOnFailure: undefined,
                scaleImageBy: undefined,
            } as InputOptions,
            name: 'should return defaults if everything is undefined',
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
