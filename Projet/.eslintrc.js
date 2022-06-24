module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        'eslint:recommended'
    ],
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "globals": {
        "d3": true
    },
    "rules": {
        indent: 'off',
        'spaced-comment': ['error', 'always'],
        'no-unused-vars': 'warn'
    }
}
