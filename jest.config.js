/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  verbose: true,
  maxConcurrency: 10,
  maxWorkers: 10,
  detectOpenHandles: true,
  detectLeaks: true,
  testTimeout: 15000,
};