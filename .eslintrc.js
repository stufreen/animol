module.exports = {
    "extends": "eslint-config-airbnb-es5",
    "env": {
        "browser": true,
        "jest": true,
        "es6": true
    },
    "rules": {
        "no-param-reassign": 0,
        "vars-on-top": 0,
        "func-names": 0
    },
    "parserOptions": {
        "sourceType": "module"
    }
};
