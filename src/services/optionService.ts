import {Options} from '../types/Options';

const override = (inputOptions: {}): Options => {
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
