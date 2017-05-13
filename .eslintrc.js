module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:flowtype/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "flowtype"
    ],
    "rules": {
        "no-unused-vars": [
            "warn"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-console": [0],
        "react/prop-types": 0
    },
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": false
        }
    }
};