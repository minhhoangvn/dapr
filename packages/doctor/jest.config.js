/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */;
const baseConfig = require('../../jest.config');
const packageName = require('./package.json').name.split('@minhhoang/').pop();
module.exports = {
  ...baseConfig,
  globals: {
    'ts-jest': {
      "tsconfig": "tsconfig.json",
      "diagnostics": true,
    }
  },
  rootDir: "../..",
  name: "@minhhoang/doctor",
  displayName: "@minhhoang/doctor",
  roots: [
    `<rootDir>/packages/${packageName}`,
  ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/packages/doctor/src/$1",
  },
};