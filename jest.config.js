// jest.config.js
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  verbose: true,
  automock: false,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 20,
      lines: 90,
      statements: 90,
    },
  },
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  cacheDirectory: '.jest/cache',
};
