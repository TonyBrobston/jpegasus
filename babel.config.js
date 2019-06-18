module.exports = function(api) {
    api.cache(true);
    return {
        presets: [
            [
                '@babel/env',
                {
                    targets: {
                        edge: '11',
                        firefox: '60',
                        chrome: '67',
                        safari: '11.1',
                    },
                    useBuiltIns: 'usage',
                },
            ],
        ],
    };
};
