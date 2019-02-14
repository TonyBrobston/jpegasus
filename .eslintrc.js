module.exports = {
    extends: 'google',
    parser: 'babel-eslint',
    rules: {
        'max-len': [
            'error', {
                'code': 120
            }
        ],
        'require-jsdoc': [0]
    }
};
