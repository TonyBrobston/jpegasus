import optionService from '../../src/services/optionService';
import {InputOptions} from '../../src/types/InputOptions';
import {Options} from '../../src/types/Options';

describe('optionService', (): void => {
    const scenarios = [
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: false,
                fixImageOrientation: true,
                quality: 0.5,
                returnOriginalIfCompressedFileIsLarger: false,
                returnOriginalOnFailure: true,
                scaleImageBy: 1.00,
                transparencyFillColor: '#FFF',
            } as Options,
            inputOptions: {} as InputOptions,
            name: 'should not override any inputOptions',
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                fixImageOrientation: false,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                returnOriginalIfCompressedFileIsLarger: true,
                returnOriginalOnFailure: false,
                scaleImageBy: 0.49,
                transparencyFillColor: '#FOO',
            } as Options,
            inputOptions: {
                allowCrossOriginResourceSharing: true,
                fixImageOrientation: false,
                maxHeight: 5,
                maxWidth: 4,
                quality: 0.75,
                returnOriginalIfCompressedFileIsLarger: true,
                returnOriginalOnFailure: false,
                scaleImageBy: 0.49,
                transparencyFillColor: '#FOO',
            } as InputOptions,
            name: 'should override all inputOptions',
        },
        {
            expectedOptions: {
                allowCrossOriginResourceSharing: true,
                fixImageOrientation: true,
                quality: 0.5,
                returnOriginalIfCompressedFileIsLarger: false,
                returnOriginalOnFailure: true,
                scaleImageBy: 1.00,
                transparencyFillColor: '#FFF',
            } as Options,
            inputOptions: {
                allowCrossOriginResourceSharing: true,
            } as InputOptions,
            name: 'should override only allowCrossOriginResourceSharing',
        },
    ];

    scenarios.forEach((scenario: {
        expectedOptions: {},
        inputOptions: {},
        name: string,
    }): void => {
        it(scenario.name, (): void => {
            const mergedOptions = optionService.override(scenario.inputOptions);

            expect(mergedOptions).toEqual(scenario.expectedOptions);
        });
    });
});
