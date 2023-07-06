// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  env: {
    browser: true,
    jquery: true
  },
  globals: {
    google: true,
    Fingerprint: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/vue3-recommended',
    'plugin:vuetify/base',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // vuetify helper
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/no-deprecated-components': 'warn',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": 0,
    // 'template-curly-spacing' : "off", // might be needed for weird babel-eslint error
    'curly': ['error', 'all'],
    "comma-dangle": ["error", "only-multiline"],
    quotes: ['error', 'single', {
      "allowTemplateLiterals": true
    }],
    'no-useless-catch': 0,
    'no-async-promise-executor': 0,
    'array-callback-return': 0,
    'no-case-declarations': 0,
    'multiline-ternary': 0,
    'no-prototype-builtins': 0,

    // vue settings
    'vue/v-on-event-hyphenation': 0,
    'vue/no-v-html': 0,
    'vue/require-component-is': 0,
    'vue/require-default-prop': ['error'],
    'vue/script-indent':[
      "error",
      2,
      {
        "baseIndent": 1,
        "switchCase": 1,
      }
    ],
    'vue/html-indent':[
      "error",
      2
    ],
    "vue/singleline-html-element-content-newline": ["error", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true
    }],
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "always"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": {
        "max": 1
      }
    }],
    "vue/attributes-order": ["error", {
      "order": [
        "DEFINITION",
        "LIST_RENDERING",
        "CONDITIONALS",
        "RENDER_MODIFIERS",
        "GLOBAL",
        "UNIQUE",
        "TWO_WAY_BINDING",
        "OTHER_DIRECTIVES",
        "OTHER_ATTR",
        "EVENTS",
        "CONTENT"
      ]
    }],
    "vue/no-multi-spaces": ["error", {
      "ignoreProperties": false
    }],
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "emits",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }],
    "vue/multiline-html-element-content-newline": ["error"],
    "vue/html-closing-bracket-spacing": ["error"],
    'vue/multi-word-component-names': 0
  }
}
