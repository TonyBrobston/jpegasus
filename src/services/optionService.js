const override = (inputOptions) => {
    return {
        allowCrossOriginResourceSharing: inputOptions.allowCrossOriginResourceSharing ?
            inputOptions.allowCrossOriginResourceSharing : false,
        maxHeight: inputOptions.maxHeight ? inputOptions.maxHeight : 16250,
        maxWidth: inputOptions.maxWidth ? inputOptions.maxWidth : 16250,
        quality: inputOptions.quality ? inputOptions.quality : 0.5,
        readImageFileTimeout: inputOptions.readImageFileTimeout ?
            inputOptions.readImageFileTimeout : 5000,
    };
};

export default {
    override,
};
