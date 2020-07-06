/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  setupFiles: ['<rootDir>/test/env'],
  roots: ['<rootDir>'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
