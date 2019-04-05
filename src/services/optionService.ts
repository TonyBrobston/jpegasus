import {Options} from '../types/Options'

const override = (inputOptions: any) => {
    return {
        allowCrossOriginResourceSharing: false,
        quality: 0.5,
        readImageFileTimeout: 5000,
        ...inputOptions,
    };
};

export default {
    override,
};
