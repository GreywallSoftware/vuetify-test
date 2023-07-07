/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {

  clearMocks: true,

  coverageDirectory: 'coverage',

  moduleDirectories: [
    'node_modules'
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: ['vue', 'js', 'json'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@mock(.*)$': '<rootDir>/test/unit/__mocks__/$1',
    '^@test(.*)$': '<rootDir>/test/unit/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/test/unit/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@shared(.*)$': '<rootDir>/../veoci-shared$1',
    '^@node(.*)$': '<rootDir>/node_modules$1'
  },


  preset: '@vue/cli-plugin-unit-jest',

  setupFiles: [
    '<rootDir>/test/unit/utils/jestSetup.js'
  ],


  testEnvironment: 'jsdom',

  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },

  // The glob patterns Jest uses to detect test files
  testMatch: [
    // '**/test/unit/components/**/?(*.)+(spec|test).[tj]s?(x)'
    '**/test/unit/components/Pages/blockSettings/BorderEditor.spec.js'
  ],

  transform: {
    '^.+\\.[mc]?js$': ['babel-jest', { rootMode: 'upward' }],
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  // transform: undefined,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    'node_modules/(?!(@ckpack\\/vue-color|vue2-google-maps|leaflet-geosearch|ag-grid-vue3|vuetify|vue-signature|d3|d3-.*|internmap|delaunator|robust-predicates|color-shorthand-hex-to-six-digit|codsen-utils)/)',
    '<rootDir>/../node_modules/(?!(d3|d3-.*)/)',
    '<rootDir>/../node_modules/(?!(vuetify)/)',
  ],
}
