import {InputOptions} from '../types/InputOptions';
import {Options} from '../types/Options';

const override = (inputOptions: InputOptions): Options => {
    return {
        allowCrossOriginResourceSharing: false,
        fixImageOrientation: true,
        quality: 0.5,
        returnOriginalIfCompressedFileIsLarger: false,
        returnOriginalOnFailure: true,
        scaleImageBy: 1.00,
        transparencyFillColor: '#FFF',
        ...inputOptions,
    };
};

export default {
    override,
};
