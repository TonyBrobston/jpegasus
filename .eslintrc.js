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
                'code': 100
            }
        ],
        'no-empty': [0],
        'require-jsdoc': [0]
    }
};
