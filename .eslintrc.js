module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": ["compat"],
    "rules": {
        "compat/compat": "error"
    },
    "settings": {
        "polyfills": ["promises"]
    },
    "parserOptions": {
        "sourceType": "module"
    }
};
