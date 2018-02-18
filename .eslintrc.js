module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },

    "extends": "eslint:recommended",

    "parserOptions": {
        "sourceType": "module"
    },
    
    "plugins": [ "html" ],
    
    "settings": {
        "html/html-extensions": [".html", ".we"],  // consider .html and .we files as HTML
        },
    
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};