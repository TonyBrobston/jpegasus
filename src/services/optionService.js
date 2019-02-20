const override = (inputOptions) => {
    return {
        allowCrossOriginResourceSharing: false,
        maxHeight: 16250,
        maxWidth: 16250,
        quality: 0.5,
        readImageFileTimeout: 5000,
        ...inputOptions,
    };
};

export default {
    override,
};
