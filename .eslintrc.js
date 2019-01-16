module.exports = {
    "extends": "airbnb-base/legacy",
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "plugins": ["compat"],
    "rules": {
        "compat/compat": "error",
        "no-param-reassign": 0
    },
    "settings": {
        "polyfills": ["promises"]
    },
    "parserOptions": {
        "sourceType": "module"
    }
};
