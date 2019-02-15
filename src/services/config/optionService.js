const override = (options) => {
    const defaultOptions = {
        allowCrossOriginResourceSharing: false,
        maxHeight: 16250,
        maxWidth: 16250,
        quality: 0.5,
        readImageFileTimeout: 5000,
    };

    return {
        ...defaultOptions,
        ...options,
    };
};

export default {
    override,
};