import {InputOptions} from '../types/InputOptions';
import {Options} from '../types/Options';

const override = (inputOptions: InputOptions): Options => {
    return {
        allowCrossOriginResourceSharing: false,
        quality: 0.5,
        returnOriginalOnFailure: true,
        scaleImageBy: 1.00,
        ...inputOptions,
    };
};

export default {
    override,
};
