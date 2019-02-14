module.exports = {
    extends: 'google',
    parser: 'babel-eslint',
    rules: {
        'indent': [
            'error',
            4
        ],
        'max-len': [
            'error', {
                'code': 120
            }
        ],
        'require-jsdoc': [0]
    }
};
