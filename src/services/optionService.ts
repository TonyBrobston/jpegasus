import {InputOptions} from '../types/InputOptions';
import {Options} from '../types/Options';

const override = ({
    allowCrossOriginResourceSharing,
    maxHeight,
    maxWidth,
    quality,
    returnOriginalOnFailure,
    scaleImageBy,
}: InputOptions): Options => ({
    allowCrossOriginResourceSharing: allowCrossOriginResourceSharing ? allowCrossOriginResourceSharing : false,
    maxHeight: maxHeight ? maxHeight : undefined,
    maxWidth: maxWidth ? maxWidth : undefined,
    quality: quality ? quality : 0.5,
    returnOriginalOnFailure: typeof returnOriginalOnFailure !== 'undefined' ? returnOriginalOnFailure : true,
    scaleImageBy: scaleImageBy ? scaleImageBy : 1.00,
});

export default {
    override,
};
