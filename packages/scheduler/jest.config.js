/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const baseConfig = require('../../jest.config')
const packageName = require('./package.json').name.split('@minhhoang/').pop()
module.exports = {
  ...baseConfig,
  rootDir: "../..",
  name: "@minhhoang/scheduler",
  displayName: "@minhhoang/scheduler",
  roots: [
    `<rootDir>/packages/${packageName}`,
  ],
};