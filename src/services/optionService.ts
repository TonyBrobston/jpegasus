import {Options} from '../types/Options';

const override = (inputOptions: Options): Options => {
    return {
        allowCrossOriginResourceSharing: false,
        quality: 0.5,
        returnOriginalOnFailure: true,
        ...inputOptions,
    };
};

export default {
    override,
};
