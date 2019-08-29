module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": '@typescript-eslint/parser',
    "extends": [
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": "off",
        "camelcase":"off",
        "no-console": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
    },
    "settings": {
        "import/resolver": {
          "node": {
            "extensions": [".js", ".ts"]
          },
        }
    },
};