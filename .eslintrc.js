module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: [
    './static/**'
  ],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/html-indent': 'off',
    'vue/no-v-html': 'off',
    'lines-between-class-members': 'off',
    indent: 'off',
    camelcase: 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error']
  }
}
